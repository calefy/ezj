/**
 * 自动处理 /api/** 请求代理接口
 */
import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import Url from 'url';
import crypto from 'crypto';
import FormData from 'form-data';
import forEach from 'lodash/forEach';

import config from '../../config';
import ApiClientNode from '../../shared/api/apiClientNode';
import { paramify, getApiRequestHeader } from '../../shared/libs/utils';

const router = require('express').Router();
const uploader = multer({ dest: '/tmp' });


function getNoPrefixUrl(path, params = {}) {
    const paramStr = paramify(params);

    const url = path.replace(config.apiReplacePrefix, '') +
                (paramStr ? '?' + paramStr : '');

    return url;
}

// 针对头像文件上传路径处理
router.post(/^\/v3\/storage\/upload/, uploader.single('avatar'), function(req, res, next) {
    // IE9及以下用flash上传的图片，类型为octet-stream
    if (!req.file.mimetype.startsWith('image') && req.file.mimetype !== 'application/octet-stream') {
        res.send({ status: 455, message: '文件类型错误' });
        return;
    }
    if (req.file.size > 10 * 1024 *1024) {
        res.send({ status: 455, message: '图片大小超限' });
        return;
    }

    // 设置FormData
    const form = new FormData();
    form.maxDataSize = 1024 * 1024 * 60; // 设置最大文件大小60M
    //form.pauseStreams = false;
    form.append(
        'avatar',
        fs.createReadStream(req.file.path),
        {
            contentType: req.file.mimetype,
            filename: req.file.originalname,
            knownLength: req.file.size, // form-data长度读取不到，传递长度
        }
    );
    // 暂存在res.locals中，将在发送http请求时调用
    res.locals.body = form;

    next();
});

// ckeditor 文件上传
router.post('/editor/upload', uploader.single('upload'), function(req, res, next) {
    function sendHtml(p, m) {
        res.send(`<script>window.parent.CKEDITOR.tools.callFunction(${req.query.CKEditorFuncNum}, '${p || ''}', '${m || ''}');</script>`)
    }
    if (!req.file.mimetype.startsWith('image')) {
        sendHtml('', '文件类型错误，请上传图片');
        return;
    }
    if (req.file.size > 10 * 1024 *1024) {
        sendHtml('', '图片大小超限');
        return;
    }
    // 设置FormData
    const form = new FormData();
    form.append('file', fs.createReadStream(req.file.path), {
            contentType: req.file.mimetype,
            filename: req.file.originalname
        });
    // 发送
    const apiClient = new ApiClientNode({ prefix: config.apiPrefix });
    const url = getNoPrefixUrl('/v1/els/storage/upload-pic', req.query);
    const headers = getApiRequestHeader(req, ApiClientNode.CONTENT_TYPE_MULTI);

    // 发起请求
    apiClient.request(req.method, url, form, headers)
        .then(function(result) {
            sendHtml(result.data.file);
        }, function(err) {
            sendHtml('', err && err.message || '上传失败');
        });
});

/**
 * 自动处理所有请求
 */
router.all('*', function(req, res, next) {
    // 准备请求
    const apiClient = new ApiClientNode({ prefix: config.apiPrefix });
    const url = getNoPrefixUrl(req.path, req.query);
    const headerType = req.get(ApiClientNode.HEADER_CONTENT_TYPE);
    const body = res.locals.body || req.body;
    const ip = req.ip.replace(/[^\d]*(\d+(\.\d+){3})[^\d]*/, '$1');
    const headers = getApiRequestHeader(req,
                body instanceof FormData ?
                    ApiClientNode.CONTENT_TYPE_MULTI :
                    req.get(ApiClientNode.HEADER_CONTENT_TYPE)
            );

    // 发起请求
    apiClient.request(req.method, url, body, headers)
        .then(function(result) {
            /*** 目前除登录设置cookie外，其他接口都不需要cookie控制
            const authToken = apiClient.getAuthToken();
            if (authToken) {
                // authToken有可能为多条cookie，expressjs中只能通过res.cookie实现多条cookie设置
                let optionKeys = ['domain', 'expires', 'httpOnly', 'httponly', 'maxAge', 'Max-Age', 'path', 'secure', 'signed'];
                authToken.forEach(function(str) {
                    let obj = { name: '', value: '', options: {} };
                    str.split(';').forEach(function(item) {
                        item = item.trim();
                        let arr = item.split('=');
                        if (arr.length === 2) {
                            arr[0] = arr[0].trim();
                            arr[1] = arr[1].trim();
                            if (optionKeys.indexOf(arr[0]) >= 0) {
                                obj.options[arr[0]] = arr[1];
                            } else {
                                obj.name = arr[0];
                                obj.value = arr[1];
                            }
                        }
                    });
                    if (obj.options.expires) { obj.options.expires = new Date(obj.options.expires); }
                    if (obj.options['Max-Age']) { obj.options.maxAge = obj.options['Max-Age']; }
                    obj.options.domain = '.ezijing.com';
                    console.log('cookie in api: ', str, "\n cookie to client:", obj);
                    res.cookie(obj.name, obj.value, obj.options);
                });
            }
            */
            // 检查如果是登录接口调用，需要写cookie
            if (/v\d+\/sso\/(?:login|register)$/.test(req.path) && result.data.ticket) {
                let expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                // 翻转、加盐、base64
                const salt = '0ZSGxuBkSJS5';
                let sup = result.data.ticket.split('').reverse().join('');
                let token = salt + sup + Math.random();
                sup = new Buffer(token).toString('base64');
                // yii格式加密 hmac sha256
                let serialize = `a:2:{i:0;s:4:"_SUP";i:1;s:${sup.length}:"${sup}";}`;
                let hamc = crypto.createHmac('sha256', 'VzpR5JMDNqUsOZ0IFQARNLU9_0KLr9UC');
                hamc.update(serialize);
                sup = hamc.digest('hex') + serialize;
                // 设置到cookie
                let opts = {path: '/', domain: '.ezijing.com'};
                if (req.body.remember) {
                    opts.expires = expires;
                }
                res.cookie('_SUP', sup, opts);
            }
            res.json(result);
        }, function(err) {
            res.json({
                status : err && err.status || 455,
                message: err && err.message || 'Request bad.'
            });
        });

});


module.exports = router;

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
import { paramify } from '../../shared/libs/utils';

const router = require('express').Router();
const uploader = multer({ dest: '/tmp' });


function getNoPrefixUrl(path, params = {}) {
    const paramStr = paramify(params);

    const url = path.replace(config.apiReplacePrefix, '') +
                (paramStr ? '?' + paramStr : '');

    return url;
}

// 针对两个文件上传路径处理 `/v1/account/avatar`, `/v1/els/storage/upload`
router.post(/^\/v1\/(account\/avatar|els\/storage\/upload)/,
        uploader.single('file'), function(req, res, next) {

    let isAvatar = req.path.endsWith('avatar');
    if (isAvatar && !req.file.mimetype.startsWith('image')) {
        res.status(555).send({ status: 455, message: '文件类型错误' });
        return;
    }

    // 设置FormData
    const form = new FormData();
    form.maxDataSize = 1024 * 1024 * 60; // 设置最大文件大小60M
    //form.pauseStreams = false;
    form.append(
        isAvatar ? 'avatar' : 'file',
        fs.createReadStream(req.file.path),
        {
            contentType: req.file.mimetype,
            filename: req.file.originalname
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
    const headers = {
        'Content-Type': ApiClientNode.CONTENT_TYPE_MULTI,
        'Cookie': req.get('cookie'),
        'X-Real-Ip': req.ip
    };

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
    const headers = {
        'Content-Type': body instanceof FormData ?
                            ApiClientNode.CONTENT_TYPE_MULTI :
                            req.get(ApiClientNode.HEADER_CONTENT_TYPE),
        'Cookie': req.get('cookie'),
        'X-Real-Ip': req.ip
    };

    // 发起请求
    apiClient.request(req.method, url, body, headers)
        .then(function(result) {
            const authToken = apiClient.getAuthToken();
            if (authToken) {
                res.set( 'Set-Cookie', authToken+ ';' + res.get('Set-Cookie') );
            }
            // 检查如果是登录接口调用，需要写cookie
            if (/v\d+\/sso\/(?:login|register)$/.test(req.path) && result.data.ticket) {
                // 翻转、加盐、base64
                const salt = '0ZSGxuBkSJS5';
                let expires = 'expires=' + (new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).toGMTString() + ';';
                let sup = result.data.ticket.split('').reverse().join('');
                let token = salt + sup + Math.random();
                sup = new Buffer(token).toString('base64');
                // yii格式加密 hmac sha256
                let serialize = `a:2:{i:0;s:4:"_SUP";i:1;s:${sup.length}:"${sup}";}`;
                let hamc = crypto.createHmac('sha256', 'VzpR5JMDNqUsOZ0IFQARNLU9_0KLr9UC');
                hamc.update(serialize);
                sup = hamc.digest('hex') + encodeURIComponent(serialize);
                // 设置到cookie
                sup = '_SUP=' + sup + ';path=/;domain=.ezijing.com;' + ( req.body.remember ? expires : '');
                res.set('Set-Cookie', sup + (res.get('Set-Cookie') || ''));
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

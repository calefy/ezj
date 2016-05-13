import React from 'react';
import Formsy from 'formsy-react';

let countor = 0;

let FormsyUpload = React.createClass({
    mixins: [ Formsy.Mixin ],

    propTypes: {
        name: React.PropTypes.string.isRequired, // 如果用label，react会警告嵌套问题，很奇怪
        label: React.PropTypes.string.isRequired,
        fileVal: React.PropTypes.string,
        server: React.PropTypes.string,
        id: React.PropTypes.string,
        showInfo: React.PropTypes.bool,
        onFileQueued: React.PropTypes.func,
        onFileSuccess: React.PropTypes.func,
        onFileError: React.PropTypes.func
    },

    uploader: null,

    getInitialState: function() {
        return { uploading: false };
    },

    getDefaultProps: function() {
        countor++;
        return {
            id: 'webuploader_' + countor,
            name: 'file',
            server: '/api/v3/storage/upload/avatar',
            showInfo: true,
        }
    },

    isUploading: function() {
        return this.state.uploading;
    },

    componentDidMount: function() {
        window.jQuery = window.$ = require('jquery');
        const WebUploader = require('tb-webuploader/dist/webuploader.min.js');
        if (!WebUploader.Uploader.support()) {
            alert('上传功能不支持您的浏览器！请尝试安装或升级 flash 播放器');
            return;
        }
        this.uploader = WebUploader.create({
            auto: true,
            server: this.props.server,
            pick: {id: '#' + this.props.id, multiple: false},
            swf: require('tb-webuploader/dist/Uploader.swf'),
            fileVal: this.props.fileVal || this.props.name,
            fileSingleSizeLimit: this.props.fileSingleSizeLimit || 10 * 1024 * 1024,
            fileNumLimit: 1,
            fileSizeLimit: this.props.fileSizeLimit || undefined,
            chunked: false,
            accept: this.props.accept || null
        });

        this.uploader
            // 进入队列前，重置队列
            .on('beforeFileQueued', function(file) {
                this.uploader.reset();
            }.bind(this))
            // 加入队列后，显示文件名
            .on('fileQueued', function(file) {
                if (this.props.onFileQueued) {
                    this.props.onFileQueued(file);
                }
            }.bind(this))
            .on('uploadStart', function(file) {
                this.setState({uploading: true});
            }.bind(this))
            .on('uploadComplete', function(file) {
                this.setState({uploading: false});
            }.bind(this))
            // 上传成功
            .on( 'uploadSuccess', function( file, res  ) {
                if (res.data) {
                    this.setValue(JSON.stringify(res.data));
                    if (this.props.onFileSuccess) {
                        this.props.onFileSuccess(res);
                    }
                } else {
                    if (this.props.onFileError) {
                        this.props.onFileError(res);
                    }
                }
            }.bind(this))
            // 上传出错
            .on( 'uploadError', function( file, reason ) {
                if (this.props.onFileError) {
                    this.props.onFileError(reason);
                }
            }.bind(this))
            // 出错
            .on('error', function(type) {
                var msg;
                switch(type) {
                    case 'Q_EXCEED_NUM_LIMIT':
                        msg = '文件数量超出限制';
                        break;
                    case 'Q_EXCEED_SIZE_LIMIT':
                    case 'F_EXCEED_SIZE':
                        msg = '文件大小超限';
                        break;
                    case 'Q_TYPE_DENIED':
                        msg = '文件类型错误';
                        break;
                    default:
                        msg = 'Error: ' + type;
                }
                if (this.props.onFileError) {
                    this.props.onFileError(msg);
                }
            }.bind(this));
    },

    render: function () {
        let val = this.getValue();
        if (val && val.length > 40) {
            val = val.replace(/^(.{5}).*(.{5})\.(.*)$/, '$1...$2.$3');
        }
        // 可以用自定义的children替换默认button，但id值必须与传入的id属性一致
        // webuploader 必须是div作为button，因IE下button中包含其他标签，会不生效
        return (
            <div style={{display: 'inline-block' }}>
                {this.props.children ?
                    this.props.children :
                    <div
                        id={this.props.id}
                        className="btn"
                    >{this.props.label}</div>
                }
                {this.state.uploading ?
                    <span className="loading"><i className="iconfont icon-loading fa-spin"></i></span>
                    :
                    this.props.showInfo ?
                        <span style={{ fontSize:'12px' }}>{val}</span>
                        :
                        null
                }
            </div>
        );
    }
});

module.exports = FormsyUpload;



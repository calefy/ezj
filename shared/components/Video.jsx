import React, { Component, PropTypes } from 'react';

// 播放器ID
const PLAYER_WRAP_ID = 'playerWrap';
const PLAYER_ID = 'player';
const SKIP_BEGIN_TIME = 10; // 跳过片头设置片头时间

let getPlayer = function() {};
let swfobject = {};
let continueStart = 0; // 继续学习初始值
// 定义全局监听函数
if (process.env.BROWSER) {
    window.jQuery = window.$ = require('jquery');
    swfobject = require('video'); // 视频js

    getPlayer = function() {
        return document.getElementById(PLAYER_ID);
    };

    // 开始播放，如果设置了跳过片头则设置播放时间
    window._playerStart = function() {
        if (/skip=true/.test(document.cookie)) {
            getPlayer().callAction('setCurrentTime', Math.max(continueStart, SKIP_BEGIN_TIME)); // 跳到第6秒开始播放
        } else if (continueStart) {
            getPlayer().callAction('setCurrentTime', continueStart);
        }
    }
    // 播放过程中不断触发，传递当前播放到的时间
    window._playerIng = function(time) {
        $('#' + PLAYER_WRAP_ID).trigger('player.time', {time});
    }
    // 拖动播放进度条
    window._playerSeek = function() {
        $('#' + PLAYER_WRAP_ID).trigger('player.seek', {time: player.callAction('getCurrentTime')});
    }

    window._playerCallback = function() {
        var player = getPlayer();
        if (player) {
            //player.register('onLoadStart', ''); // 开始loading加载
            player.callAction('register', 'onCanplay', '_playerStart'); // 开始播放视频内容
            player.callAction('register', 'onPlaying', '_playerIng'); // 播放中触发，300ms一次
            //player.register('onPause', ''); // 暂停
            //player.register('onResume', ''); // 恢复播放
            player.callAction('register', 'onSeekComplete', '_playerSeek'); // 拖动进度条
            //player.register('onEnded', ''); // 结束
        }
    }
}

/**
 * class Video
 */
class Video extends Component {
    static propTypes = {
        videoId: PropTypes.string.isRequired,
        videoSrt: PropTypes.string,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        autoPlay: PropTypes.bool,
        handlePlayTime: PropTypes.func,
    };

    defaultProps = {
        autoPlay: true,
        videoSrt: '',
    };

    componentDidMount() {
        continueStart = this.props.lastTime || 0; // 如果传递有上次播放时间，则记录缓存，以便player.start时使用
        this.renderPlayer(PLAYER_ID, this.props.videoId, this.props.autoPlay, this.props.videoSrt);
        setTimeout(() => {
            let help = document.getElementById('player_not_support_help');
            if (help) help.className = '';
        }, 300)
    }
    componentDidUpdate() {
        this.renderPlayer(PLAYER_ID, this.props.videoId, this.props.autoPlay, this.props.videoSrt);
    }
    shouldComponentUpdate(nextProps) {
        return this.props.videoId !== nextProps.videoId;
    }

    renderPlayer = (domId, vid, autoPlay, srt) => {

        autoPlay = typeof autoPlay === 'undefined' ? 1 : autoPlay - 0;

        // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection.
        var swfVersionStr = "11.1.0";
        // To use express install, set to playerProductInstall.swf, otherwise the empty string.
        var xiSwfUrlStr = "playerProductInstall.swf";
        var flashvars = {
            autoStart : autoPlay,
            vid : vid,
            isShowSpeeder : 1,
            videoType: 1,//0为mp4模式 1为cc模式
            callback: '_playerCallback',
        };
        if(srt){
            flashvars.srtUrl = srt;
            //flashvars.args=encodeURI( JSON.stringify({
            //    captions:[
            //        {
            //            "url": srt,
            //            "format": "SRT",
            //            "language": "zh-cn",
            //            "defaultCaption": true
            //            // "fonts": [
            //                // {
            //                    // "url": "fonts/ImpressBT.swf",
            //                    // "swfClass": "ImpressBT",
            //                    // "fontClasses": [
            //                        // {
            //                            // "className": "IMPRESSBT",
            //                            // "fontFamily": "Impress BT",
            //                            // "aliases": [
            //                                // "Impress BT"
            //                            // ]
            //                        // }
            //                    // ]
            //                // }
            //            // ]
            //        }
            //    ],
            //    captionsEnabled : true,
            //    captionsAnimated : true
            //}));
        }
        //flashvars.videoType = 1; //0为mp4模式 1为cc模式
        var params = {
            quality : "high",
            bgcolor : "#000000",
            allowscriptaccess : "sameDomain",
            allowfullscreen : "true"
        };
        var attributes = {
            id : domId,
            name : domId,
            align : "middle",
            wmode: 'opaque'
        };
        // render
        swfobject.embedSWF(
            require('player'),
            domId, this.props.width, this.props.height,
            swfVersionStr, xiSwfUrlStr,
            flashvars, params, attributes);

        // 绑定事件监听
        this.listenPlayerEvents();
    };

    listenPlayerEvents = () => {
        if (this.props.handlePlayTime) {
            $('#' + PLAYER_WRAP_ID).on('player.time player.seek', this.props.handlePlayTime);
        }
    };

    // =========提供播放后，其他组件可使用控制播放的方法===========
    getTime = () => {
        let player = getPlayer();
        if (player) {
            return player.callAction('getCurrentTime');
        } else {
            return 0;
        }
    };
    // 设置视频跳转时间
    setTimeTo = time => {
        let player = getPlayer();
        if (player) {
            player.callAction('setCurrentTime', time + 2); // flash实际播放值会大概小个一两秒，因此添加偏移
        }
    };
    // 执行“跳过片头”操作
    skipBegin = () => {
        let player = getPlayer();
        if (player && player.callAction('getCurrentTime') < SKIP_BEGIN_TIME) {
            player.callAction('setCurrentTime', SKIP_BEGIN_TIME);
        }
    };
    // 设置视频尺寸
    setSize = (w, h) => {
        let player = getPlayer();
        if (player) {
            player.width = w;
            player.height = h;
        }
    };

    render() {
        return  <div id="playerWrap">
                    <div id="player">
                        <p className="hide" id="player_not_support_help">您还没有安装flash播放器,请 <a href="http://www.adobe.com/go/getflash" target="_blank">点击这里安装</a> </p>
                    </div>
                </div>;
    }
}

module.exports = Video;

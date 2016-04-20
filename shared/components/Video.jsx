import React, { Component, PropTypes } from 'react';

// 播放器ID
const PLAYER_ID = 'player';

// 定义全局监听函数
if (process.env.BROWSER) {
    window.jQuery = window.$ = require('jquery');
    require('video'); // 视频js

    var $body = $(document.body);
    window._playerIng = function(time) {
        $body.trigger('player.time', {time});
    }
    window._playerSeek = function() {
        var player = document.getElementById(PLAYER_ID);
        $body.trigger('player.seek', {time: player.getCurrentTime()});
    }
    window._playerGoto = function(time) {
        var player = document.getElementById(PLAYER_ID);
        if (player) {
            player.setCurrentTime(time);
        }
    }

    window._playerCallback = function() {
        var player = document.getElementById(PLAYER_ID);
        if (player) {
            player.register('onPlaying', '_playerIng');
            player.register('onSeekComplete', '_playerSeek');
        }
    }
}

/**
 * class Video
 */
class Video extends Component {
    static propTypes = {
        videoId: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    };

    componentDidMount() {
        this.renderPlayer(PLAYER_ID, this.props.videoId, true);
    }
    componentDidUpdate() {
        this.renderPlayer(PLAYER_ID, this.props.videoId, true);
    }
    shouldComponentUpdate(nextProps) {
        return this.props.videoId !== nextProps.videoId;
    }
    componentWillUnmount() {
    }

    renderPlayer = (domId, vid, autoPlay) => {

        autoPlay = typeof autoPlay === 'undefined' ? 1 : autoPlay - 0;

        // For version detection, set to min. required Flash Player version, or 0 (or 0.0.0), for no version detection.
        var swfVersionStr = "11.1.0";
        // To use express install, set to playerProductInstall.swf, otherwise the empty string.
        var xiSwfUrlStr = "playerProductInstall.swf";
        var flashvars = {
            autoStart : autoPlay,
            vid : vid,
            isShowSpeeder : 1, //0为mp4模式 1为cc模式
            callback: '_playerCallback'
        };
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
    };

    render() {
        return <div id="player"><p>观看该视频需要 Adobe Flash Player 11.1.0 或更高版本</p></div>;
    }
}

module.exports = Video;

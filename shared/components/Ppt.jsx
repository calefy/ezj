import React, { Component, PropTypes } from 'react';

/**
 * ppt播放框
 *      如果同步显示，则同步props.currentIndex到state.index，否则，仅使用state.index
 */
class Ppt extends Component {
    static propTypes = {
        ppts: PropTypes.array.isRequired,
        currentIndex: PropTypes.number,

        onClose: PropTypes.func.isRequired, // 关闭ppt展示框
        onVideoSyncTime: PropTypes.func.isRequired, // 同步当前ppt_point到videoTime
        onPptOnly: PropTypes.func.isRequired, // 仅显示ppt
    };
    defaultProps = {
        currentIndex: 0,
    };
    state = {
        index: this.props.currentIndex, // ppt展示序号
        sync: true, // 视频播放时，同步调整ppt展示
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.sync) {
            this.gotoIndex(nextProps.currentIndex);
        }
    }
    // 逐一对比变更项，只有不同时，才更新
    shouldComponentUpdate(nextProps, nextState) {
        const {ppts, currentIndex} = this.props;
        const { index, sync } = this.state;
        return ppts !== nextProps.ppts || currentIndex !== nextProps.currentIndex ||
                index !== nextState.index || sync !== nextState.sync;
    }

    getIndex = index => {
        return Math.min(this.props.ppts.length - 1, Math.max(0, index));
    };
    gotoIndex = index => {
        return this.setState(Object.assign({}, this.state, { index: this.getIndex(index) }));
    };
    prev = e => {
        e.preventDefault();
        this.setState({ index: this.getIndex(this.state.index - 1), sync: false })
    };
    next = e => {
        e.preventDefault();
        this.setState({ index: this.getIndex(this.state.index + 1), sync: false })
    };

    onToggleSync = e => {
        let toSync = !this.state.sync;
        let index = this.state.index;
        if (toSync) {
            index = this.props.currentIndex;
        }
        this.setState({ sync: toSync, index: index });
    };
    onSetVideoTime = e => {
        let ppts = this.props.ppts;
        let index = this.state.index;
        let point = ppts[index].ppt_point;
        this.props.onVideoSyncTime(point);
    };
    setSize = (w, h) => {
        this.refs.wrap.style.width = w + 'px';
        this.refs.wrap.style.height = h + 'px';
    };

    render() {
        const { ppts } = this.props;
        const len = ppts.length
        let { index, sync } = this.state;
        index = this.getIndex(index);

        if (!len) return null;

        return (
            <div className="play-ppt" ref="wrap">
                <div className="play-preview">
                    <img src={ppts[index].ppt_url} className="play-ppt-img" />
                </div>
                <div className="play-controls cl">
                    <div className="fl">
                        {index > 0 ? <a href="#" onClick={this.prev} style={{ margin: "0 20px 0 0" }}><i className="iconfont icon-left"></i></a> : null }
                        {index + 1 < len ? <a href="#" onClick={this.next}><i className="iconfont icon-arrow"></i></a> : null }
                    </div>
                    <div className="play-page">
                        <span className="play-now">{index + 1}</span>
                        /
                        <span className="play-total">{len}</span>页
                    </div>
                    <div className="play-amazing fr">
                        <i className={`iconfont icon-rotate ${sync ? 'active' : ''}`} onClick={this.onToggleSync}></i>
                        <i className="iconfont icon-big" onClick={this.props.onPptOnly}></i>
                        <i className="iconfont icon-play" onClick={this.onSetVideoTime}></i>
                        <i className="iconfont icon-del" onClick={this.props.onClose}></i>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Ppt;

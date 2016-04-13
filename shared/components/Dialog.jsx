import React from 'react';

let Dialog = React.createClass({
    propTypes: {
        open: React.PropTypes.bool,
        onRequestClose: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            open: false,
            className: 'pop'
        }
    },

    render: function() {
        if (!this.props.open) return null;

        return (
            <div>
                <div {...this.props}>
                    <i className="iconfont icon-close" onClick={this.props.onRequestClose}></i>
                    <div className="pop-content">
                        {this.props.children}
                    </div>
                </div>
                <div className="screen-bg"></div>
            </div>
        );
    }
});

module.exports = Dialog;

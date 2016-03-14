/**
 * 确认框组件
 * @author chenlinfei<chenlinfei@ezijing.com>
 * @since 2016-03-01
 */
import React from 'react';
import { FlatButton, Dialog } from 'material-ui';

let ConfirmDialog = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        onConfirm: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            title: '确认操作',
            text: '确认要执行该操作吗？'
        }
    },
    getInitialState: function() {
        return { _open: false };
    },

    open: function() {
        this.setState({ _open: true });
    },

    handleClose: function() {
        this.setState({ _open: false });
    },
    handleConfirm: function() {
        this.handleClose();
        this.props.onConfirm();
    },

    render: function() {
        let actions = [
            <FlatButton
                label="确定"
                primary={true}
                onTouchTap={this.handleConfirm}
            />,
            <FlatButton
                label="取消"
                secondary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />
            
        ];

        return (
            <Dialog
                open = { this.state._open }
                actions = { actions }
                onRequestClose = { this.handleClose }
                { ...this.props }
            >
                { this.props.children }
            </Dialog>
        );
    }
});

module.exports = ConfirmDialog;

import React from 'react';
import { Snackbar } from 'material-ui';

let CustomSnackbar = React.createClass({

    getInitialState: function() {
        return {
            snackbarOpen: false,
            snackbarMessage: '',
            snackbarAction: ''
        };
    },

    show: function (message, action = '') {
        this.setState(Object.assign({}, this.state, {
            snackbarOpen: true,
            snackbarMessage: message
            //snackbarAction: action
        }));
    },

    hide: function() {
        this.setState(Object.assign({}, this.state, {
            snackbarOpen: false,
            snackbarMessage: ''
        }));
    },

    render: function() {
        return (
            <Snackbar
                open =      {this.state.snackbarOpen}
                message =   {this.state.snackbarMessage}
                action =    {this.state.snackbarAction}
                autoHideDuration={3000}
                onRequestClose={this.hide}
                style={{ textAlign: 'center' }}
                bodyStyle={{ minWidth: 200 }}
            />
        );
    }
});

module.exports = CustomSnackbar;

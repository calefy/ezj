/**
 * 富文本编辑器封装，基于ckeditor
 * @author chenlinfei<chenlinfei@ezijing.com>
 * @since 2016-02-29
 */

import React from 'react';
import Formsy from 'formsy-react';

let countor = 0;

let FormsyRadio = React.createClass({
    mixins: [ Formsy.Mixin ],

    propTypes: {
        name: React.PropTypes.string.isRequired
    },

    handleValueChange: function (event, value) {
        this.setValue(value);
        if (this.props.onChange) this.props.onChange(event, value);
    },

    componentDidMount: function () {
        this.setValue(this._muiComponent.isChecked());
    },

    render: function () {

        var className = this.showRequired() ? 'required' : this.showError() ? 'error' : '';
        var errorMessage = this.getErrorMessage();

        return (
            <div>
               
            </div>
        );
    }
});

module.exports = FormsyRadio;

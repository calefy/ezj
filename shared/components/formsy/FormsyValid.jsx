/**
 * 富文本编辑器封装，基于ckeditor
 * @author chenlinfei<chenlinfei@ezijing.com>
 * @since 2016-02-29
 */

import React from 'react';
import Formsy from 'formsy-react';

let countor = 0;

let FormsyValid = React.createClass({
    mixins: [ Formsy.Mixin ],

    propTypes: {
        name: React.PropTypes.string.isRequired
    },

    changeValue(event) {
        this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);
    },


    render: function () {

        var className = this.showRequired() ? 'required' : this.showError() ? 'error' : '';
        var errorMessage = this.getErrorMessage();

        return (
            <div className={`formsy-list cl ${className}`}>
                <label htmlFor={this.props.name}>{this.props.title}</label>
                <div className="formsy-input formsy-valid">
                    <input
                        type={this.props.type || 'text'}
                        name={this.props.name}
                        onChange={this.changeValue}
                        value={this.getValue()}
                        checked={this.props.type === 'checkbox' && this.getValue() ? 'checked' : null}
                    />
                    <button type="button" className="valid-btn" onClick={this.props.validClick}>{this.props.valid}</button>
                </div>
                <span className='validation-error'>{errorMessage}</span>
            </div>
        );
    }
});

module.exports = FormsyValid;

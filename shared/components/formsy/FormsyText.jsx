/**
 * formsy text
 */

import React from 'react';
import Formsy from 'formsy-react';

let FormsyText = React.createClass({
    mixins: [ Formsy.Mixin ],

    propTypes: {
        name: React.PropTypes.string.isRequired
    },

    componentDidMount() {
        this.setValue(this.props.defaultValue || '');
    },
    changeValue(event) {
        this.setValue(event.currentTarget.value);
    },


    render: function () {

        var className = this.showRequired() ? 'required' : this.showError() ? 'error' : '';
        var errorMessage = this.getErrorMessage();

        return (
            <div className={`formsy-list cl ${className}`}>
                <label htmlFor={this.props.name}>{this.props.title}</label>
                <div className={`formsy-input ${this.showError() ? 'input-error' : ''}`}>
                    <input
                        type={this.props.type || 'text'}
                        name={this.props.name}
                        onChange={this.changeValue}
                        value={this.getValue()}
                        defaultValue={this.props.defaultValue}
                        placeholder={this.props.placeholder}
                    />
                </div>
                <span className='validation-error'>{errorMessage}</span>
            </div>
        );
    }
});

module.exports = FormsyText;

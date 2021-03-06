/**
 * formsy checkbox
 */

import React from 'react';
import Formsy from 'formsy-react';

let FormsyCheckbox = React.createClass({
    mixins: [ Formsy.Mixin ],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        defaultChecked: React.PropTypes.bool,
    },

    componentDidMount: function() {
        this.setValue(this.refs.ck.checked ? this.refs.ck.value : '');
    },

    handleChange: function (e) {
        let v = e.currentTarget.checked ? e.currentTarget.value : '';
        this.setValue(v);

        if (this.props.onChange) {
            this.props.onChange(this.props.name, v);
        }
    },

    render: function () {
        return (
            <input type="checkbox" {...this.props} onChange={this.handleChange} ref="ck" />
        );
    }
});

module.exports = FormsyCheckbox;

/**
 * formsy radio
 * 【废弃】
 */

import React from 'react';
import Formsy from 'formsy-react';

let FormsyRadio = React.createClass({
    mixins: [ Formsy.Mixin ],

    propTypes: {
        name: React.PropTypes.string.isRequired
    },

    componentDidMount: function() {
        this.setValue(this.refs.rd.checked ? this.refs.rd.value : '');
    },

    handleChange: function (e) {
        this.setValue(e.currentTarget.checked ? e.currentTarget.value : '');
    },

    render: function () {
        return (
            <input type="radio" {...this.props} onChange={this.handleChange} ref="rd" />
        );
    }
});

module.exports = FormsyRadio;

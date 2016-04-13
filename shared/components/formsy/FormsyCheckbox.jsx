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

    handleChange: function (e) {
        this.setValue(e.currentTarget.checked ? e.currentTarget.value : '');
    },

    render: function () {
        return (
            <input type="checkbox" {...this.props} onChange={this.handleChange} />
        );
    }
});

module.exports = FormsyCheckbox;

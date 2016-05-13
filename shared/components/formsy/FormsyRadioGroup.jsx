/**
 * formsy radio group
 */

import React from 'react';
import Formsy from 'formsy-react';

let FormsyRadioGroup = React.createClass({
    mixins: [ Formsy.Mixin ],

    propTypes: {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired,
        //defaultValue: React.PropTypes.string,
        labelPosition: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return { labelPosition: 'after' }; // after,beafore
    },

    componentDidMount: function() {
        this.setValue(this.props.defaultValue);
    },

    handleChange: function (e) {
        let v = e.currentTarget.checked ? e.currentTarget.value : '';
        this.setValue(v);

        if (this.props.onChange) {
            this.props.onChange(this.props.name, v);
        }
    },

    render: function () {
        const {name, options} = this.props;
        return (
            <span className={this.props.className} style={this.props.style}>
                {this.props.options.map((item, index) => {
                    return  <label key={index}>
                                {this.props.labelPosition === 'before' ? item.label : null}
                                &nbsp;
                                <input type="radio" value={item.value} defaultChecked={this.props.defaultValue == item.value} onChange={this.handleChange} name={name} />
                                &nbsp;
                                {this.props.labelPosition === 'after' ? item.label : null}
                                &emsp;
                            </label>
                })}
            </span>
        );
    }
});

module.exports = FormsyRadioGroup;


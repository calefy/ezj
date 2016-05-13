/**
 * 地址控件：省市县
 */
import React from 'react';
import Formsy from 'formsy-react';
import Address from '../../libs/address';
import map from 'lodash/map';

let FormsyAddress = React.createClass({
    mixins: [Formsy.Mixin],
    propTypes: {
        name: React.PropTypes.string.isRequired,
    },
    getDefaultProps: function() {
         return {
             defaultProvince: '',
             defaultCity: '',
             defaultCounty: '',
         };
    },
    getInitialState: function() {
        return {
            province: this.props.defaultProvince,
            city: this.props.defaultCity,
        };
    },
    componentDidMount: function() {
        this.setValue([this.props.defaultProvince, this.props.defaultCity, this.props.defaultCounty].join(','));
    },

    getDomValue: function() {
        return [
            this.refs.province.value,
            this.refs.city.value,
            this.refs.county.value
        ];
    },


    onChangeProvince: function(e) {
        let v = this.getDomValue();
        v[1] = '';
        v[2] = '';
        this.setValue(v.join(','));
        this.setState({province: v[0], city: v[1]});
    },
    onChangeCity: function(e) {
        let v = this.getDomValue();
        v[2] = '';
        this.setValue(v.join(','));
        this.setState({province: v[0], city: v[1]});
    },
    onChangeCounty: function(e) {
        this.setValue(this.getDomValue().join(','));
    },

    render: function() {
        let className = this.showRequired() ? 'required' : this.showError() ? 'error' : '';

        return (
            <div className={`formsy-list cl ${className}`}>
                <label>{this.props.title}</label>
                <div className="formsy-select">
                    <select defaultValue={this.props.defaultProvince} onChange={this.onChangeProvince} ref="province">
                        <option value="">请选择</option>
                        {map(Address || {}, (item, key) => {
                            return <option key={key} value={key}>{item.name}</option>
                        })}
                    </select>
                    <select defaultValue={this.props.defaultCity} onChange={this.onChangeCity} ref="city">
                        <option value="">请选择</option>
                        {map(this.state.province && Address[this.state.province] || {}, (item, key) => {
                            return <option key={key} value={key}>{item.name}</option>
                        })}
                    </select>
                    <select defaultValue={this.props.defaultCounty} onChange={this.onChangeCounty} ref="county">
                        <option value="">请选择</option>
                        {map(this.state.province && this.state.city &&
                            Address[this.state.province] &&
                            Address[this.state.province][this.state.city] || {}, (item, key) => {
                            return <option key={key} value={key}>{item.name}</option>
                        })}
                    </select>
                </div>
                <span className='validation-error'>{this.getErrorMessage()}</span>
            </div>
        );
    }
});

module.exports = FormsyAddress;

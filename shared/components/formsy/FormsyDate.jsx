/**
 * 日期控件
 */
import React from 'react';
import Formsy from 'formsy-react';

let FormsyDate = React.createClass({
    mixins: [Formsy.Mixin],
    propTypes: {
        name: React.PropTypes.string.isRequired,
        defaultValue: React.PropTypes.string.isRequired,
    },
    getDefaultProps: function() {
         return {
             defaultValue: '1990-01-01',
         };
    },
    getInitialState: function() {
        let d = this.props.defaultValue.split('-');
        return {
            days: this.getMonthDays(d[0], d[1]),
        };
    },
    componentDidMount: function() {
        this.setValue(this.props.defaultValue);
    },

    getDomValue: function() {
        return [
            this.refs.year.value,
            this.refs.month.value,
            this.refs.day.value
        ];
    },

    getMonthDays: function(year, month) {
        let m = parseInt(month, 10);
        return [1,3,5,7,8,10,12].indexOf(m) >= 0 ? 31 :
                [4,6,9,11].indexOf(m) >= 0 ? 30 :
                year % 4 === 0 ? 29 : 28;
    },

    updateDays: function() {
        let v = this.getDomValue();
        let ds = this.getMonthDays(v[0], v[1]);
    },

    onChangeYear: function(e) {
        let v = this.getDomValue();
        let d = this.getMonthDays(v[0], v[1]);
        if (this.state.days != d) {
            this.setState({ days: d });
            if (v[2] > d) {
                v[2] = '01';
            }
        }
        this.setValue(v.join('-'));
    },
    onChangeMonth: function(e) {
        let v = this.getDomValue();
        let d = this.getMonthDays(v[0], v[1]);
        if (this.state.days != d) {
            this.setState({ days: d });
            if (v[2] > d) {
                v[2] = '01';
            }
        }
        this.setValue(v.join('-'));
    },
    onChangeDay: function(e) {
        this.setValue(this.getDomValue().join('-'));
    },

    render: function() {
        let className = this.showRequired() ? 'required' : this.showError() ? 'error' : '';
        let propsValue = this.props.defaultValue.split('-');

        return (
            <div className={`formsy-list cl ${className}`}>
                <label>{this.props.title}</label>
                <div className="formsy-select">
                    <select defaultValue={propsValue[0]} onChange={this.onChangeYear} ref="year">
                        {(() => {
                            let b = (new Date()).getFullYear();
                            let e = 1950;
                            let ret = [];
                            for (; b >= e; b--) {
                                ret.push(<option key={b} value={b}>{b}</option>)
                            }
                            return ret;
                        })()}
                    </select>年
                    <select defaultValue={propsValue[1]} onChange={this.onChangeMonth} ref="month">
                        {(() => {
                            let b = 1;
                            let e = 12;
                            let ret = [];
                            for (; b <= e; b++) {
                                let s = b < 10 ? '0' + b : b;
                                ret.push(<option key={b} value={s}>{s}</option>);
                            }
                            return ret;
                        })()}
                    </select>月
                    <select defaultValue={propsValue[2]} onChange={this.onChangeDay} ref="day">
                        {(() => {
                            let b = 1;
                            let e = this.state.days;
                            let ret = [];
                            for (; b <= e; b++) {
                                let s = b < 10 ? '0' + b : b;
                                ret.push(<option key={b} value={s}>{s}</option>);
                            }
                            return ret;
                        })()}
                    </select>日
                </div>
                <span className='validation-error'>{this.getErrorMessage()}</span>
            </div>
        );
    }
});

module.exports = FormsyDate;

/**
 * 抽离loading
 * @author chenlinfei<chenlinfei@ezijing.com>
 * @since 2016-03-01
 */
import React from 'react';
import { RefreshIndicator } from 'material-ui';

let Loading = React.createClass({
    render: function() {
        let obj = Object.assign({
                size: 50,
                left: 450,
                top: 50,
                status: 'loading'
            }, this.props);

        return  <div className="rel"><RefreshIndicator { ...obj }/></div>
    }
});

module.exports = Loading;

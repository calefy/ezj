import React from 'react';
import { Link } from 'react-router';

if (process.env.BROWSER) {
    require('css/mobile.css');
}

let TopicIndex = React.createClass({
    render: function() {
        return (
            <div className="mobile-test">
            	111
            </div>
        );
    }
});

module.exports = TopicIndex;

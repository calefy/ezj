import React from 'react';
import { Link } from 'react-router';

if (process.env.BROWSER) {
    require('css/mobile.css');
}

let TopicIndex = React.createClass({
    render: function() {
        return (
            <div className="mobile-mine">
            	<div className="mobile-header">
            		<i className="iconfont icon-left1"></i>
            		<h1>我的测验</h1>
            	</div>
            	<div className="mobile-content">
            		<ul>
            			<li>
            				<h4>采购战略和管理</h4>
            				<div>
            					<p><em>2016/2/15 16:17:11</em></p>
            					<p><em>正确率80%</em></p>
            					<Link to="/mobile/test">重新测验</Link>
            				</div>
            			</li>
            			<li>
            				<h4>企业理财与公司金融综合服务业务金融综合服务业务</h4>
            				<div>
            					<p><em>2016/2/15 16:17:11</em></p>
            					<p><em>正确率80%</em></p>
            					<Link to="/mobile/test">重新测验</Link>
            				</div>
            			</li>
            			<li>
            				<h4>采购战略和管理</h4>
            				<div>
            					<p><em>2016/2/15 16:17:11</em></p>
            					<p><em>正确率80%</em></p>
            					<Link to="/mobile/test">重新测验</Link>
            				</div>
            			</li>
            		</ul>
            	</div>
            </div>
        );
    }
});

module.exports = TopicIndex;

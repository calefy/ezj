import React from 'react';
import { Link } from 'react-router';

if (process.env.BROWSER) {
    require('css/mobile.css');
}

let TopicIndex = React.createClass({
    render: function() {
        return (
            <div className="mobile-test">
            	<div className="hide">
	            	<div className="mobile-header">
	            		<i className="iconfont icon-left1"></i>
	            		<h1>经济学基础</h1>
	            	</div>
	            	<div className="mobile-content">
	            		<div className="mobile-content-top">
	            			<div className="mobile-content-title">
	            				<h4>连锁消费企业的发展方向与投资问问我机会</h4>
	            				<p>课程测试</p>
	            			</div>
	            			<div className="mobile-content-num">
	            				<p>题目数量：<em>20道</em></p>
	            				<p>单选：10 道</p>
	            				<p>多选：10 道</p>
	            			</div>
	            		</div>
	            	</div>
	            	<div className="mobile-footer">
	            		<Link to="">开始</Link>
	            	</div>
            	</div>
            	<div className="hide">
	            	<div className="mobile-header">
	            		<i className="iconfont icon-left1"></i>
	            		<h1>经济学基础</h1>
	            	</div>
	            	<div className="mobile-content">
	            		<h4 className="mobile-knowledge">知识点回顾</h4>
	            		<div className="mobile-content-top mobile-test-question">
	            			<p>20. 民事诉讼中，当事人对自己提出的主张，有责任提供正剧。但在（     ）中，对原告提出的侵权事实被告否认的由被告负责举证说是，都免费是，毒奶粉</p>
	            			<p><em>多选题</em><em className="fr">1 / 6</em></p>
	            		</div>
	            		<ul className="mobile-test-answer">
	            			<li>
	            				<input type="checkbox" /><em>因产品制造方法发明专利引起的专利诉讼</em>
	            			</li>
	            			<li>
	            				<input type="checkbox" /><em>因产品制造方法发明专利引起的专利诉讼</em>
	            			</li>
	            			<li>
	            				<input type="radio" checked /><em>因产品制造方法发明专利引起的专利诉讼</em>
	            			</li>
	            			<li>
	            				<input type="checkbox" /><em>因产品制造方法发明专利引起的专利诉讼</em>
	            			</li>
	            		</ul>
	            	</div>
	            	<div className="mobile-footer mobile-footer-three">
	            		<Link to="" className="disabled"><em>上一题</em></Link>
	            		<Link to=""><em>下一题</em></Link>
	            		<Link to=""><em>跳过</em></Link>
	            	</div>
            	</div>
            	<div className="hide">
	            	<div className="mobile-header">
	            		<i className="iconfont icon-left1"></i>
	            		<h1>经济学基础</h1>
	            	</div>
	            	<div className="mobile-content">
	            		<h4 className="mobile-knowledge">知识点回顾</h4>
	            		<div className="mobile-content-top mobile-test-question">
	            			<p>20. 民事诉讼中，当事人对自己提出的主张，有责任提供正剧。但在（     ）中，对原告提出的侵权事实被告否认的由被告负责举证说是，都免费是，毒奶粉</p>
	            			<p><em>多选题</em><em className="fr">1 / 6</em></p>
	            		</div>
	            		<ul className="mobile-test-answer">
	            			<li>
	            				<i className="iconfont icon-choose"></i><em>因产品制造方法发明专利引起的专利诉讼</em>
	            			</li>
	            			<li>
	            				<i className="iconfont icon-del"></i><em>因产品制造方法发明专利引起的专利诉讼</em>
	            			</li>
	            			<li>
	            				<i></i><em>因产品制造方法发明专利引起的专利诉讼</em>
	            			</li>
	            			<li>
	            				<i></i><em>因产品制造方法发明专利引起的专利诉讼</em>
	            			</li>
	            		</ul>
	            		<p className="mobile-answer-right">正确答案：A</p>
	            	</div>
	            	<div className="mobile-footer mobile-footer-two">
	            		<Link to="" className="disabled"><em>上一题</em></Link>
	            		<Link to=""><em>下一题</em></Link>
	            	</div>
            	</div>
            	<div className="mobile-pop hide">
            		<p>是否提交测验？</p>
            		<div className="mobile-pop-btn">
            			<Link to=""><em>否</em></Link>
            			<Link to="">是</Link>
            		</div>
            	</div>
            	<div className="screen-bg hide"></div>
            	<div className="">
            		<div className="mobile-header">
	            		<i className="iconfont icon-left1"></i>
	            		<h1>经济学基础</h1>
	            	</div>
	            	<div className="mobile-content">
	            		<div className="mobile-content-top">
	            			<div className="mobile-content-title">
	            				<h4>连锁消费企业的发展方向与投资问问我机会</h4>
	            				<p>课程测试</p>
	            			</div>
	            			<div className="mobile-content-num" style={{ height: 150 }}>
	            				<p>题目数量：<em>20道</em></p>
	            				<p>正确率：</p>
            					<div className="circle" style={{ left: 120 }}>
									<div className="pie_left"><div className="left"></div></div>
									<div className="pie_right"><div className="right"></div></div>
									<div className="mask"><span>15</span>%</div>
								</div>
	            			</div>
	            		</div>
	            		<Link to="" className="check-answer">查看答案</Link>
	            	</div>
	            	<div className="mobile-footer mobile-footer-two">
	            		<Link to=""><em>完成</em></Link>
	            		<Link to=""><em>重新测试</em></Link>
	            	</div>
            	</div>
            </div>
        );
    }
});

module.exports = TopicIndex;

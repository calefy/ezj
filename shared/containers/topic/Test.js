import React from 'react';
import { Link } from 'react-router';

if (process.env.BROWSER) {
    require('css/special.css');
}

let TopicIndex = React.createClass({
    render: function() {
        return (
            <div className="special-continue-test">
            	<div className="special-banner cl">
				    <div className="container">
				        <img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/0d79a42d379bb1666e7b48d6747f9971.png" />
				    </div>
				</div>
				<div className="container">
					<div className="course-test-info">
	                    <h2><i className="iconfont icon-chapter"></i>第一套【课程测试】</h2>
	                    <div className="course-test-num">
	                        <dl className="cl">
	                            <dt>题目数量:</dt>
	                            <dd><em>6</em>道题</dd>
	                        </dl>
	                        <dl className="cl">
	                            <dt>单选题:</dt>
	                            <dd><em>6</em>道题</dd>
	                        </dl>
	                        <dl className="cl">
	                            <dt>多选题:</dt>
	                            <dd><em>0</em>道题</dd>
	                        </dl>
	                    </div>
	                    <button className="btn" type="button" onClick={this.onClickExam}>开始答题</button>
	                </div>
	                <div className="course-test-question">
	                	<h2>
	                		<p>单项选择题</p>
	                		<p>已做 <em className="course-test-already">1</em> 题 / 共 6 题</p>
	                	</h2>
	                    <dl className="course-test-question-info">
	                        <dt>
	                            <em>1.</em><div className="dib vat">波士顿咨询公司的创始人、战略学的先驱是（）</div>
	                        </dt>
	                        <dd><input type="radio" />A. 马丁·瑞夫斯</dd>
	                        <dd><input type="radio" />B. 布鲁斯·亨德森</dd>
	                        <dd><input type="checkbox" />C. 迈克尔·波特</dd>
	                        <dd><input type="radio" />D. 伊恩·里德</dd>
	                    </dl>
	                    <div className="course-test-question-btn">
	                        <Link to="" className="btn btn-disabled">上一题</Link>
	                        <Link to="" className="btn">下一题</Link>
	                        <Link to="" className="btn">跳过</Link>
	                        <Link to="" className="btn">提交答卷</Link>
	                    </div>
	                </div>
	                <div className="course-test-result">
	                    <h2><i className="iconfont icon-chapter"></i>课程测验结果</h2>
	                    <h4>BCG战略调色板对中国金融机构的启示和应用【课程测试】</h4>
	                    <div className="course-test-num">
	                        <dl className="cl">
	                            <dt>题目数量</dt>
	                            <dd>8道题</dd>
	                        </dl>
	                        <dl className="cl">
	                            <dt>正确率</dt>
	                            <dd>38%</dd>
	                        </dl>
	                        <dl className="cl">
	                            <dt>答题日期</dt>
	                            <dd>2014.12.04</dd>
	                        </dl>
	                    </div>
	                    <div style={{ position: "relative"}}>
	                        <button className="btn" type="button" onClick={this.onClickExam}>重新测验</button>
	                        <Link to="" className="course-test-see">查看答案</Link>
	                    </div>
	                </div>
	                <div className="result-content course-result-content">
	                    <dl>
	                        <dt>1.一般情况下，新发行基金的封闭期不得超过（ ）</dt>
	                        <dd>
	                            <input type="checkbox" value="option1" />
	                            <span>A.域名是数字</span>
	                            <em className="true fr">正确答案：C</em>
	                        </dd>
	                        <dd>
	                            <input type="checkbox" value="option1" />
	                            <span>A.域名是数字</span>
	                        </dd>
	                        <dd>
	                            <input type="checkbox" value="option1" />
	                            <span>A.域名是数字</span>
	                        </dd>
	                        <dd>
	                            <input type="checkbox" value="option1" />
	                            <span>A.域名是数字</span>
	                        </dd>
	                    </dl>
	                    <dl>
	                        <dt>2.假设有一支新设立的基金，发行份额共1亿份，每个份额的初始价值1元。基金经理买入200万股股票A，300万股股票B，250万股股票C，三只股票的价格变化如下。那么一个月后，该基金的基金净值为（ ），此时有新的投资者希望能够认购该基金，请问此时基金的申购价格应为（ ），基金公司一共收到了300万份基金申购，那么此时该基金的总规模为（ ）亿 股票A 股票B 股票C 买入价格20、10、10，一个月后市价18、12、14。</dt>
	                        <dd>
	                            <input type="checkbox" value="option1" />
	                            <span>A.1.12 1.12 1.1536</span>
	                            <em className="true fr">正确答案：C</em>
	                        </dd>
	                        <dd>
	                            <input type="checkbox" value="option1" />
	                            <span>B.1.12 1.12 0.9874</span>
	                        </dd>
	                        <dd>
	                            <input type="checkbox" value="option1" />
	                            <span>C.1.00 1.12 1.1536</span>
	                        </dd>
	                        <dd>
	                            <input type="checkbox" value="option1" />
	                            <span>D.1.23 1.23 0.9874</span>
	                        </dd>
	                        <p>答案解析：答案解析答案解析答案解析</p>
	                    </dl>
	                </div>
				</div>
            	
            </div>
        );
    }
});

module.exports = TopicIndex;

import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

class Result extends Component {

    render() {
        return (
            <div className="study-center-right fr">
                <h1 className="h1-title">查看测验结果<Link to="/study/test" className="fr">《 返回我的测验</Link></h1>
                <div className="study-result shadow bg-white">
                    <div className="study-result-title">
                        <p>课程名称：采购战略和管理</p>
                        <em>答题时间:2016/2/14&emsp;下午3:17:11</em>
                        <em>答题时长:3分钟46秒</em>
                        <em>题目数量:112</em>
                        <em>正确率:50%</em>
                    </div>
                    <div className="result-content">
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
                            <dt>2.假设有一支新设立的基金，发行份额共1亿份，每个份额的初始价值1元。基金经理买入200万股股票A，300万股股票B，250万股股票C，三只股票的价格变化如下。
那么一个月后，该基金的基金净值为（ ），此时有新的投资者希望能够认购该基金，请问此时基金的申购价格应为（ ），基金公司一共收到了300万份基金申购，那
么此时该基金的总规模为（ ）亿 股票A 股票B 股票C 买入价格20、10、10，一个月后市价18、12、14。</dt>
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
}

module.exports = Result;

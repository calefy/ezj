import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';

class Study extends Component {

    render() {
        return (
            <div className="study-center-right shadow bg-white fr">
                <div className="study-test">
                    <h4 className="h4-title">我的测验</h4>
                    <div className="table" style={{margin:32}}>
                        <table>
                            <thead>
                                <tr>
                                    <th width="200">课程名称</th>
                                    <th width="300">答题时间</th>
                                    <th width="100">正确率</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><Link to="#">采购战略和管理</Link></td>
                                    <td>2016/02/15&emsp;下午4:17:11</td>
                                    <td>80%</td>
                                    <td><Link to="/study/result">查看结果</Link><Link to="#">重新测试</Link></td>
                                </tr>
                                <tr>
                                    <td><Link to="#">采购战略和管理</Link></td>
                                    <td>2016/02/15&emsp;下午4:17:11</td>
                                    <td>80%</td>
                                    <td><Link to="#">查看结果</Link><Link to="#">重新测试</Link></td>
                                </tr>
                                <tr>
                                    <td><Link to="#">采购战略和管理</Link></td>
                                    <td>2016/02/15&emsp;下午4:17:11</td>
                                    <td>80%</td>
                                    <td><Link to="#">查看结果</Link><Link to="#">重新测试</Link></td>
                                </tr>
                                <tr>
                                    <td><Link to="#">采购战略和管理</Link></td>
                                    <td>2016/02/15&emsp;下午4:17:11</td>
                                    <td>80%</td>
                                    <td><Link to="#">查看结果</Link><Link to="#">重新测试</Link></td>
                                </tr>
                                <tr>
                                    <td><Link to="#">采购战略和管理</Link></td>
                                    <td>2016/02/15&emsp;下午4:17:11</td>
                                    <td>80%</td>
                                    <td><Link to="#">查看结果</Link><Link to="#">重新测试</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Study;
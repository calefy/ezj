/**
 * 学习中心未登录页面
 */
import React, { Component, PropTypes } from 'react';

class Intro extends Component {
    render() {
        return (
            <div style={{padding:'40px 0 80px'}}>
                <img src={require('../../assets/img/study-pic.png')} alt=""/>
            </div>
        );
    }
}

module.exports = Intro;


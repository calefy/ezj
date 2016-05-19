import React from 'react';

class Index extends React.Component {
    render() {
        return (
            <div className="mobile-index">
                <img src="//zj-avatar.img-cn-beijing.aliyuncs.com/3d343988be5e63bf79fe753d3635cf0d1611228698.jpg@100p" alt=""/>
                <div>
                    <h1>在这里学习全中国最好的金融课程</h1>
                    <p>财富管理 企业理财 互联网金融 资产证券化 金融领导力 学位教育</p>
                    <div>
                        <a href="/app/download?s=mpage" className="btn">下载 App</a>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Index;

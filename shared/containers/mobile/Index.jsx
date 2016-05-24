import React from 'react';

class Index extends React.Component {
    render() {
        return (
            <div className="mobile-index">
                <img src="//zj-avatar.img-cn-beijing.aliyuncs.com/b77df0bce42b6e92b5b7fdc5d47cc8038639395.jpg@100p" alt=""/>
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

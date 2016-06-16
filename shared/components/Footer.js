import React from 'react';
import { Link } from 'react-router';

module.exports = () => {
    return (
        <div className="footer">
            <div className="footer-top">
                <div className="container cl">
                    <div className="footer-top-logo fl">
                        <img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/d81961e664deacc24847dbd6296d0f36.png" alt="" />
                        <address>
                            北京市海淀区双清路清华大学东门液晶大厦2层<br />
                            电话：4008-363-463<br />
                            邮箱：<a href="mailto:service@ezijing.com">service@ezijing.com</a>
                        </address>
                    </div>
                    <div className="footer-top-menu fl">
                        <h4>关于我们</h4>
                        <Link to="/"><i className="iconfont icon-arrowwhite"></i>网站首页</Link>
                        <Link to="/help/about"><i className="iconfont icon-arrowwhite"></i>关于我们</Link>
                        <Link to="/help/contact"><i className="iconfont icon-arrowwhite"></i>联系我们</Link>
                        {true ? null : <Link to="/help/opinion"><i className="iconfont icon-arrowwhite"></i>意见反馈</Link>}
                    </div>
                    <div className="footer-top-app fl">
                        <h4>APP下载（安卓&IOS）</h4>
                        <img src="//zj-avatar.img-cn-beijing.aliyuncs.com/db790274a542962480e4e2ecf5927e131004061786.png" alt="扫码下载" />
                    </div>
                    <div className="footer-top-ew fl">
                        <h4>关注我们</h4>
                        <img src="//xplat-avatar.oss-cn-beijing.aliyuncs.com/268f04e853346b3b92269b45f4340817.jpg" alt="扫码关注" />
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <span>友情链接：</span>
                    <a href="http://study.163.com" target="_blank">网易云课堂</a>
                    <a href="http://www.chuanke.com/s1843804.html" target="_blank">百度传课</a>
                    <a href="http://www.ijiacai.com" target="_blank" title="">家财网</a>
                    <a href="http://i.xue.taobao.com/my/list_published_courses.htm?spm=a2174.7365737.a214cy6.15.298cfX" target="_blank">淘宝同学</a>
                    <a href="http://ezijing.ke.qq.com/" target="_blank">腾讯课堂</a>
                    <a href="https://www.yuntouhui.cn" target="_blank">云投汇</a>
                    <a href="http://www.weiyangx.com/" target="_blank">未央网</a>
                    <p>Copyright &copy; 2016 Zijing Education. All rights reserved. 京ICP证150431号</p>
                </div>
            </div>
        </div>
    );
}



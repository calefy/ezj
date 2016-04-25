/**
 * 页面header
 *
 * - 用户登录后下拉菜单
 * - 登录、注册弹框
 * - 退出
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import trim from 'lodash/trim';

import { getRequestTypes, avatar } from '../libs/utils';
import UserAction from '../actions/UserAction';
import OperateAction from '../actions/OperateAction';
import Dialog     from '../components/Dialog.jsx';
import RegistForm from '../components/RegistForm.jsx';
import LoginForm  from '../components/LoginForm.jsx';

class Header extends Component {
    state = {
        showMenu: false,  // 头像下来菜单显示与否
        showDialog: false,  // 显示登录注册框
        dialogType: 'login', // 对话框类型
    };

    userAction = new UserAction();

    componentWillReceiveProps(nextProps) {
        const loginType = getRequestTypes(UserAction.LOGIN);
        const sendType = getRequestTypes(UserAction.SEND);
        const registType = getRequestTypes(UserAction.REGIST);
        switch(nextProps.action.type) {
            case loginType.success:
                this.hideDialog();
                break;
            case loginType.failure:
                this.refs.loginForm.handleResponse(nextProps.action.error);
                break;

            case sendType.failure:
                this.refs.registForm.handleResponse(RegistForm.RESPONSE_VALID_CODE, nextProps.action.error);
                break;

            case registType.success:
                this.hideDialog();
                break;
            case registType.failure:
                this.refs.registForm.handleResponse(RegistForm.RESPONSE_REGIST, nextProps.action.error);
                break;

            case OperateAction.OPEN_LOGIN_DIALOG: // 从其他组件调用打开登录对话框
                this._setState({ showDialog: true, dialogType: 'login' });
                break;
        }
    }

    /**
     * 设置state
     */
    _setState = obj => {
        this.setState(Object.assign({}, this.state, obj || {}));
    };

    /**
     * 用户菜单显示与否
     */
    toggleMenu = () => {
        this._setState({ showMenu: !this.state.showMenu });
    };
    showMenu = () => {
        this._setState({showMenu: true});
    };
    hideMenu = () => {
        this._setState({showMenu: false});
    };

    /**
     * 登录框显示与否
     */
    showDialog = (e) => {
        this._setState({ showDialog: true, dialogType: e.currentTarget.value });
    };
    hideDialog = () => {
        this._setState({ showDialog: false });
    };

    /**
     * 切换不同表单
     */
    handleTurnToLogin = () => {
        this._setState({dialogType: 'login'});
    };
    handleTurnToRegist = () => {
        this._setState({dialogType: 'regist'});
    };
    handleTurnToPasswd = () => {
        this._setState({ showDialog: false });
    };

    /**
     * 执行注册
     */
    handleSendValidCode = (contact) => {
        this.props.dispatch(this.userAction.send(contact));
    };
    handleRegist = (data) => {
        this.props.dispatch(this.userAction.reg(data));
    };

    /**
     * 执行登录
     */
    handleLogin = data => {
        this.props.dispatch(this.userAction.login(data));
    };

    handleLogout = () => {
        this._setState({ showMenu: false });
        this.props.dispatch(this.userAction.logout());
        // 清除本地cookie
        document.cookie = '_SUP=;domain=.ezijing.com;expires='+(new Date()).toGMTString()+';';
    };

    // 搜索
    onSearchSubmit = e => {
        e.preventDefault();
        e.nativeEvent.returnValue = false;
        let v = trim(this.refs.q.value);
        if (v) {
            this.props.history.push({ pathname: '/courses', query: { q: v } });
        }
    };

    render() {
        const user = this.props.user.data || {}
        const pathname = this.props.location.pathname;
        return (
            <div className="header cl">
                <div className="container">
                    <div className="logo fl">
                        <Link to="/"><img src="http://xplat-avatar.oss-cn-beijing.aliyuncs.com/1bb87d41d15fe27b500a4bfcde01bb0e.png" alt="" /></Link>
                    </div>
                    <nav className="header-nav fl mar-r22">
                        <ul>
                            <li>
                                <Link to="/" className={pathname === '/' ? 'cur' : null}>首页</Link>
                            </li>
                            <li>
                                <Link to="/courses" className={pathname === '/courses' ? 'cur' : null}>全部课程</Link>
                            </li>
                            <li>
                                <Link to="/study/all" className={/^\/study/.test(pathname) ? 'cur' : null}>学习中心</Link>
                            </li>
                        </ul>
                    </nav>
                    <form className="header-search fl" action="/courses" method="GET" onSubmit={this.onSearchSubmit}>
                        <input type="text" ref="q" name="q" placeholder="请输入您要搜索的关键词" />
                        <button type="submit"><i className="iconfont icon-search"></i></button>
                    </form>
                    {user.uid ?
                        <div className="header-user fr">
                            <div className="head-account fr" onClick={this.toggleMenu} onMouseEnter={this.showMenu} onMouseLeave={this.hideMenu}>
                                <div className="user-picture fr">
                                    <img src={avatar(user.avatar)}/>
                                </div>
                                <span className="user-name fr">{user.nickname}</span>
                                <ul className={`menu nav ${this.state.showMenu ? '' : 'hide' }` } >
                                    <li className="first leaf">
                                        <Link to="/account/index">个人中心</Link>
                                    </li>
                                    <li className="last leaf">
                                        <Link to="/" onClick={this.handleLogout} >退出登录</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="unread_count fr hide"><i className="iconfont icon-username"></i><span>5</span></div>
                        </div>
                        :
                        <div className="header-user fr">
                            <button onClick={this.showDialog} value="login">登录</button>
                            <button onClick={this.showDialog} value="regist">注册</button>
                        </div>
                    }
                </div>

                <Dialog
                    ref="dialog"
                    className={`pop ${this.state.dialogType === 'login' ? 'login-pop' : 'register-pop'}`}
                    open={this.state.showDialog}
                    onRequestClose={this.hideDialog}
                >
                    <div className="pop-logo"><em>紫荆教育</em></div>
                    {this.state.dialogType === 'login' ?
                        <LoginForm
                            ref="loginForm"
                            onLogin={this.handleLogin}
                            onTurnToRegist={this.handleTurnToRegist}
                            onTurnToPasswd={this.handleTurnToPasswd}
                        />
                        :
                        <RegistForm
                            ref="registForm"
                            onSendValidCode={this.handleSendValidCode}
                            onRegist={this.handleRegist}
                            onTurnToLogin={this.handleTurnToLogin}
                        />
                    }
                </Dialog>
                <div className="agreement-pop reg-pop pop">
                    <h4>紫荆教育隐私政策<i className="iconfont icon-guanbi2 fr" style={{ fontSize: 20, cursor: "pointer" }}></i></h4>
                    <div>
                        <p>紫荆教育十分重视您个人信息的保密性和安全性。我们将按照本隐私政策尽合理的努力保护您的个人信息(下称“个人信息”，定义见下文)的安全。本隐私政策中使用的“我们”均指紫荆教育。</p>
                        <p>本隐私政策仅适用于我们通过紫荆教育网站（下称“本网站”，包含ezijing.com域名下的所有内容和页面）收集的信息，不适用于我们可能通过其他方式向您收集的信息（例如，本隐私政策不适用于您可能通过电话、传真或日常信函向我们提供的信息）。</p>
                        <h5>用户名和发布</h5>
                        <p>您在我们网站上发表的评论和其他信息可能被本网站的其他访问者浏览和下载。为此，我们鼓励您在决定是否在其他参与者可浏览页面上发布可能显示您的身份的任何信息时慎重思考。</p>
                        <h5>关于在国外处理的同意</h5>
                        <p>通过访问本网站或向紫荆教育提供信息，您理解并明确同意我们为本隐私政策和紫荆教育服务条款所约定的目的在中华人民共和国、其他国家和地区收集、使用、披露和保存信息。您特此同意紫荆教育依本隐私政策收集、使用、披露和保存您的个人信息，包括但不限于在紫荆教育和本隐私政策所述的第三方、附属机构及分支机构之间转移您的个人数据。为进一步确定，关于本条所述的转移信息的任何同意应视为包含您同意将适用的个人信息转移至另一司法区域，该区域的隐私保护程度可能与您所在国家的隐私保护程度不同。
如果您不同意本隐私政策的条款，您无权访问、浏览或注册本网站。</p>
                        <p>如果您选择不向我们提供本网站为您提供各种服务所必要的信息，您可能无法创建用户帐号，我们可能无法向您提供该等服务。</p>
                        <h5>个人信息</h5>
                        <p>本隐私策略使用的“个人信息”，您使用本网站时（例如您注册用户帐号或经本网站进行交易时）可能向我们提供的关于您的任何信息，可能包括但不限于您的姓名、联系信息、性别、出生日期和职业。我们尽力把个人信息的收集范围控制在为满足商业和法律法规要求，为特定的本网站的行为所需要的范围之内。</p>
                        <h5>我们收集哪些信息以及我们如何使用这些信息</h5>
                        <p>当您注册用户帐号，参加在线课程，注册付费证明，向我们发送电子邮件和/或参与公共论坛时，我们将收集信息，包括上述个人信息。我们也收集关于学生表现和学习模式的使用信息。此外，我们还记录显示以下内容的信息：本网站哪些页面被访问，其被访问的顺序和被访问的时间，哪些超链接和其他用户界面控件被使用等。</p>
                        <p>我们可能登录本网站的每个用户所使用的IP地址、操作系统和浏览器软件，我们可能可以从IP地址确定用户的互联网服务提供商和其连接点的地理位置。我们将适用各种网络分析工具收集这些信息。一些信息将通过Cookie（即本网站可以接触到的、存在您电脑上的、存储着有关您的信息的小文本文件）收集。您应该能够控制您的Web浏览器如何以及是否接受Cookie。大多数浏览器都在工具栏上的“帮助”部分提供关于如何重置浏览器以拒绝Cookie的说明。如果您拒绝我们的Cookie，本网站的许多功能和服务可能无法正常工作。</p>
                        <h5>用于个性化和教学水平提高</h5>
                        <p>我们的目标是尽可能为现在和未来的访问者提供最好的学习体验。为进一步实现此目标，我们有时会向不同的用户呈现不同版本的课程资料和软件。之所以这么做，是为了向个人学生提供个性化体验（评估学生的学习水平和学习风格，为其呈现最合适的资料），评估我们的课程资料的有效性，增进我们对学习过程的理解，以及提高我们提供的内容的有效性。我们可能发表或以其他形式公开此过程的结果，但除非本隐私政策另有约定允许，上述发表或公开披露均不会包含个人信息。</p>
                        <h5>链接到其他网站</h5>
                        <p>本网站包含了前往第三方（包括其他内容提供者以及某些服务供应商，如代表紫荆教育处理支付的服务商等）发布的网站的链接。这些网站不在我们控制范围之内，您确认并同意，除非本隐私政策中另有约定，我们不必为该等网站收集和使用您的信息承担责任。我们鼓励您在被转接至第三方网站时了解并查阅您访问和使用的每个网站的隐私政策。</p>
                        <h5>安全</h5>
                        <p>紫荆教育设计了一套保护其持有或控制的个人信息的程序，但是互联网传输方法或电子存储方法均非100%安全，因此紫荆教育无法保证个人信息的绝对安全。</p>
                        <h5>修改隐私政策</h5>
                        <p>请注意，我们可能随时审查并修改本隐私政策。本隐私政策修改后，本隐私政策链接将包含注记“更新（日期）”，这意味着您应查阅新条款，任何修改在本页面上发布后立即生效，并附更新后的生效日期。至少在更新后七（7）天内，本隐私政策链接将显示更新注记。在本网站进行任何修改之后，您访问本网站即视为您已同意修改后的本隐私政策和本网站的其他全部修改。如果您错过了前述通知，请定期访问本网页以了解本隐私政策的最新版本。</p>
                        <h5>未成年人</h5>
                        <p>本网站并非为13周岁以下的个人设计，紫荆教育并未明知而收集前述年龄段个人的数据。如果我们知悉任何13周岁以下个人进行了注册，我们将从记录中删除任何相关个人信息。</p>
                        <h5>隐私顾虑</h5>
                        <p>如果您有隐私顾虑，或者披露了您希望保密的数据，或者希望访问我们持有的关于您的信息，请联系我们：service@ezijing.com。</p>
                        <em>生效日期 ：2014年9月15日</em>
                    </div>
                </div>
                <div className="screen-bg"></div>
            </div>
        );
    }
};

module.exports = connect( state => ({
    action: state.action,
    user: state.user
}) )(Header);


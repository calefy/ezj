/**
 * 页面header
 *
 * - 用户登录后下拉菜单
 * - 登录、注册弹框
 * - 退出
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router'
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
        showProtocol: null, // 显示协议：pay/private
    };

    userAction = new UserAction();

    componentWillReceiveProps(nextProps) {
        const loginType = getRequestTypes(UserAction.LOGIN);
        const sendType = getRequestTypes(UserAction.SEND);
        const registType = getRequestTypes(UserAction.REGIST);
        switch(nextProps.action.type) {
            case loginType.success:
                this.hideDialog();
                // 因登录返回的用户数据不全，因此登录成功后加载用户完整数据
                const userAction = new UserAction();
                nextProps.dispatch(userAction.loadAccount());
                // 以上加载userinfo数据用刷新页面代替，保证退出后立马登录数据的清洁
                //document.location.reload(); // 该方式会导致加载完成前就点击的会被跳转
                break;
            case loginType.failure:
                this.refs.loginForm.handleResponse(nextProps.action.error);
                break;

            case sendType.failure:
                this.refs.registForm.handleResponse(RegistForm.RESPONSE_VALID_CODE, nextProps.action.error);
                break;

            case registType.success:
                this.hideDialog();
                // 刷新以更新数据，防止regist接口返回数据不全
                document.location.reload();
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

    hideProtocolDialog = () => {
        this._setState({ showProtocol: null });
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
    handleShowProtocol = type => {
        this._setState({ showProtocol: type });
    };

    /**
     * 执行登录
     */
    handleLogin = data => {
        this.props.dispatch(this.userAction.login(data));
    };

    handleLogout = () => {
        this._setState({ showMenu: false });
        // 清空其他需要登录的数据
        const operateAction = new OperateAction();
        this.props.dispatch(operateAction.clearLoginedData());
        // 执行退出
        this.props.dispatch(this.userAction.logout());
        // 清除本地cookie
        document.cookie = '_SUP=;domain=.ezijing.com;path=/;expires='+(new Date()).toGMTString()+';';
        // 跳转以清空缓存数据
        //setTimeout(() => { // 保证跳转后，cookie已清
        //    document.location = '/';
        //}, 300);
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
                                <Link to={user.uid ? '/study/all' : '/study/intro'} className={/^\/study/.test(pathname) ? 'cur' : null}>学习中心</Link>
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
                                    <img src={avatar(user.avatar, 'pipe1')}/>
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

                {/*登录与注册弹框*/}
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
                            onTurnToProtocol={this.handleShowProtocol}
                        />
                    }
                </Dialog>

                {/*隐私协议*/}
                <Dialog
                    className="agreement-pop pop"
                    open={this.state.showProtocol === 'private'}
                    onRequestClose={this.hideProtocolDialog}
                >
                    <h4>紫荆教育隐私政策</h4>
                    <div className="agreement-content">
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
                </Dialog>

                {/*付费协议*/}
                <Dialog
                    className="agreement-pop pop"
                    open={this.state.showProtocol === 'pay'}
                    onRequestClose={this.hideProtocolDialog}
                >
                    <h4>紫荆教育网络用户付费协议</h4>
                    <div className="agreement-content">
                        <p>尊敬的用户您好：</p>
                        <p>欢迎您选择清控紫荆（北京）教育科技有限公司（以下简称“紫荆教育”）为您提供的金融在线培训课程，为保证权益，请您在付费前详细阅读本协议，<b style={{ fontSize: 16 }}>特别是加粗部分</b>。当您点击“【我已经阅读并同意《紫荆教育网络用户付费协议》】”的，即表示您已同意并承诺遵守本协议。本协议内容包括协议正文，紫荆教育已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的组成部分，与协议正文具有同等法律效力。  </p>
                        <h5>第一条 定义</h5>
                        <p>1、“紫荆教育平台”，是指紫荆教育所有和经营的有关教育、学习等数字内容聚合、管理和分发的平台产品，旨在为课程发布者及用户提供教学内容的生成、传播和学习等平台服务。</p>
                        <p>2、“收费课程”，是指课程发布者发布至紫荆教育，有偿提供给用户的视频、文字、图片等内容。</p>
                        <p>3、“收费证书”，是指课程发布者通过紫荆教育平台向完成指定课程学习并完成课程考核的用户有偿提供的课程证书。</p>
                        <p>4、“课程发布者”，是指经紫荆教育审核同意后，通过紫荆教育平台有偿向用户提供服务或发布其享有合法权益的内容供用户学习、使用的自然人、法人、其他组织。</p>
                        <p>5、“用户”，是指在紫荆教育平台上注册，并使用平台登录进行课程学习的平台使用者。</p>
                        <h5>第二条 本协议的修订</h5>
                        <p><b>紫荆教育有权对本协议进行调整或补充，并在紫荆教育平台（www.ezijing.com）公告。若用户继续使用紫荆教育服务的，则视为接受该等调整或补充，亦或用户有权终止使用该服务。</b></p>
                        <h5>第三条 用户规则</h5>
                        <p>1、用户可在紫荆教育平台上浏览课程内容信息（包括但不限于收费课程信息、收费证书申请信息等），如用户希望有偿获得该部分内容或服务，则用户需先登录或注册紫荆教育帐号或通过页面提示,选用其他可用帐号进行登录。用户在使用紫荆教育服务时登录的帐号是紫荆教育确认用户身份的唯一依据。</p>
                        <p>2、用户理解并同意：课程发布者通过紫荆教育平台提供有偿内容或服务实行先付款后使用的方式，用户及时、足额、合法的支付所需的款项是用户使用该等有偿内容或服务的前提。</p>
                        <p>3、用户理解并同意：课程发布者通过紫荆教育平台发布的收费课程将采用整体购买的方式，即用户只需购买一次，就可以在该课程规定的有效期内学习该课程所有已发布或即将发布的课时。已购买的收费课程，在该课程规定的有效期内用户可以自己重复学习，无需再次付费。<b>但请用户注意，收费课程规定的有效期满之后，用户需要再次付费购买才能继续学习该课程，而且收费课程一经购买使用后，不得申请退款。</b></p>
                        <p><b>4、用户知悉并同意: 用户无权对已购买的课程进行出售、转让、许可或其他方式使除用户自己以外的第三方（包括但不限于自然人、法人或其他组织）使用其已购买的课程。若用户违反本条规定，则紫荆教育有权视情况采取如下措施：</b></p>
                        <p><b>4.1取消用户继续使用该课程的权利；</b></p>
                        <p><b>4.2 限制/冻结用户的帐号；</b></p>
                        <p><b>4.3 要求用户退还其通过出售、转让、许可等其他方式取得的收益；</b></p>
                        <p><b>4.4其他紫荆教育可以采取的救济措施。</b></p>
                        <p>5、支付宝及银行转账是平台可接受的支付方式。紫荆币为平台内可实现与货币兑换，并能在平台内消费的虚拟货币。用户使用支付宝及银行转账过程中因支付行为与服务供应商产生的纠纷，平台予以免责。</p>
                        <p>6、用户应保管好自己的帐号和密码（包括但不限于：支付宝帐号），如因用户未保管好自己的帐号和密码而对自己、紫荆教育或第三方造成损害的，用户将负全部责任。另外，用户应对用户帐号中的所有活动和事件负全责。用户可随时改变帐号和密码。用户同意若发现有非法使用用户的帐号或出现安全漏洞的情况，立即通告紫荆教育，紫荆教育将会尽力予以妥善解决。</p>
                        <h5>第四条 免责声明、责任限制</h5>
                        <p>1、紫荆教育平台不做如下承诺：(i) 本服务将完全符合您的要求；(ii) 本服务将永远不受干扰、及时提供、安全可靠或不会出错。</p>
                        <p>2、紫荆教育平台对本服务内容以及与本服务链接的任何网站的内容的准确性或完整性不作任何保证，对下列内容也不承担任何责任或义务（i）内容的错误、失误或不准确之处；（ii）对我公司的安全服务器和/或储存在上述服务器内的任何和所有个人信息和/或财务信息的任何未经授权的访问或使用；（iii）本服务进出传输的中断或停止。</p>
                        <p>3、紫荆教育平台对课程发布者发布的内容不做全面、实质性审查，如该等课程内容侵犯用户权利的，紫荆教育平台予以免责。</p>
                        <h5>第五条 服务的变更、中断、终止</h5>
                        <p>1、如因系统维护或升级的需要而需暂停网络服务，紫荆教育平台将尽可能事先进行通告。</p>
                        <p>2、用户在接受服务时实施本协议中有明确约定或属于紫荆教育平台事先明确告知的应被终止或限制服务的禁止性或限制性行为的，紫荆教育平台有权终止或中止或限制对用户提供服务，包括但不限于立暂时隔离、封停帐号等措施。</p>
                        <p>3、除前款所述情形外，遇第三方提供的服务故障，紫荆教育平台同时保留在不事先通知用户的情况下随时中止或终止部分或全部网络服务的权利，对于所有服务的中断或终止而造成的任何损失，紫荆教育平台无需对用户或任何第三方承担任何责任。</p>
                        <h5>第六条 其他约定</h5>
                        <p>1、所有权及知识产权：紫荆教育平台上所有内容，包括但不限于文字、软件、声音、图片、录像、图表、网站架构、网站画面的安排、网页设计、以及有偿内容或服务均由紫荆教育依法拥有其知识产权，包括但不限于著作权、商标权、专利权等。非经紫荆教育、课程发布者或其他权利人书面同意用户不得擅自使用、修改、复制、传播、改变、散布、发行或发表上述内容。如有违反，用户同意承担由此给紫荆教育造成的一切损失。</p>
                        <p>2、通知：所有发给用户的通知都可通过电子邮件、常规的信件或在网站显著位置公告的方式进行传送。</p>
                        <p>3、本协议适用中华人民共和国的法律（不含冲突法）。当本协议的任何内容与中华人民共和国法律相抵触时，应当以法律规定为准，同时相关内容将按法律规定进行修改或重新解释，而本协议其他部分的法律效力不变。</p>
                        <p>4、本协议自发布之日起实施，并构成用户和紫荆教育之间的共识。</p>
                        <p>5、紫荆教育不行使、未能及时行使或者未充分行使本协议或者按照法律规定所享有的权利，不应被视为放弃该权利，也不影响紫荆教育在将来行使该权利。</p>
                        <p>6、如果用户对本协议内容有任何疑问，请发送邮件至我们的客服邮箱：[<a href="mailto:service@pbcsf.tsinghua.edu.cn">service@pbcsf.tsinghua.edu.cn</a>]</p>
                        <p>7、协议最终解释权归紫荆教育所有！</p>
                    </div>
                </Dialog>

            </div>
        );
    }
};

module.exports = connect( state => ({
    action: state.action,
    user: state.user
}) )(Header);


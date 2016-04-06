
/**
 * 需要登录控制，供onEnter使用
 *  - 假设服务器端与浏览器端都有同样的global数据：__INITIAL_STATE__ = { user: { isFetching: false, data: {...} } }
 *  - 上面假设还有个假设：浏览器端的初始数据是经过服务器端渲染的，包含user
 */
function needLogin(nextState, replaceState) {
    if (!(typeof __INITIAL_STATE__ === 'object' &&
            __INITIAL_STATE__.user &&
            __INITIAL_STATE__.user.data)) {
        replaceState(null, '/');
    }
}


// require.ensure polyfill
if (typeof require.ensure !== 'function') {
    require.ensure = (d, c) => c(require);
}

module.exports = {
    path: '/',
    component: require('./containers/App'),
    // 首页 getIndexRoute定义中使用require.ensure无法生效
    indexRoute: {
        getComponent(location, cb) {
            require.ensure([], require => {
                cb(null, require('./containers/Home'));
            });
        }
    },
    childRoutes: [
        // 课程分类页
        {
            path: 'classify',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/Classify'));
                });
            }
        },
        // 课程分类－资产证券化页
        {
            path: 'security',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/Security'));
                });
            }
        },
        // 课程分类－资产证券化页
        {
            path: 'course',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/Course'));
                });
            }
        },
        // 重置密码页
        {
            path: 'pwd',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/pwd/index'));
                });
            },
            childRoutes: [
                {
                    path: 'index',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/pwd/Send'));
                        });
                    }
                },
                {
                    path: 'set',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/pwd/Set'));
                        });
                    }
                },
                {
                    path: 'valid',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/pwd/Valid'));
                        });
                    }
                },
                {
                    path: 'success',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/pwd/Success'));
                        });
                    }
                }
            ]
        },
        // 个人中心页
        {
            path: 'account',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/account/index'));
                });
            },
            childRoutes: [
                {
                    path: 'index',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/account/Info'));
                        });
                    }
                },
                {
                    path: 'pwd',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/account/Pwd'));
                        });
                    }
                },
                {
                    path: 'pay',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/account/Pay'));
                        });
                    }
                },
                {
                    path: 'recharge',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/account/Recharge'));
                        });
                    }
                }
            ]
        },
        {
            path: 'account',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/account/left'));
                });
            },
            childRoutes: [
                {
                    path: 'mobile',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/account/Mobile'));
                        });
                    }
                },
                {
                    path: 'email',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/account/Email'));
                        });
                    }
                },
                {
                    path: 'user',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/account/User'));
                        });
                    }
                }
            ]
        },
        // 学习中心页面
        {
            path: 'study',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/study/index'));
                });
            },
            childRoutes: [
                {
                    path: 'mine',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/study/left'));
                        });
                    },
                    childRoutes: [
                        {
                            path: 'all',
                            getComponent(location, cb) {
                                require.ensure([], require => {
                                    cb(null, require('./containers/study/All'));
                                });
                            }
                        },
                        {
                            path: 'study',
                            getComponent(location, cb) {
                                require.ensure([], require => {
                                    cb(null, require('./containers/study/Study'));
                                });
                            }
                        },
                        {
                            path: 'buy',
                            getComponent(location, cb) {
                                require.ensure([], require => {
                                    cb(null, require('./containers/study/buy'));
                                });
                            }
                        }
                    ]
                },
                {
                    path: 'collect',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/study/Collect'));
                        });
                    }
                },
                {
                    path: 'test',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/study/Test'));
                        });
                    }
                }
            ]
        },
    ]
};

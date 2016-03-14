
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
        // 动态页
        {
            path: 'notices',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/Notices'));
                });
            }
        },
        // 消息通知页
        {
            path: 'messages',
            onEnter: needLogin,
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/Messages'));
                });
            }
        },
        // 修改头像
        {
            path: 'avatar',
            onEnter: needLogin,
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/Avatar'));
                });
            }
        },
        // 修改密码页
        {
            path: 'changepass',
            onEnter: needLogin,
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/ChangePwd'));
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
                    path: 'set',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/pwd/Set'));
                        });
                    }
                },
                {
                    path: 'reset',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/pwd/Reset'));
                        });
                    }
                }
            ]
        },
        // 课程页
        {
            path: 'courses',
            onEnter: needLogin,
            indexRoute: {
                getComponent(location, cb) {
                    require.ensure([], require => {
                        cb(null, require('./containers/courses/List.jsx'));
                    });
                }
            },
            childRoutes: [
                {
                    path: 'mine',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/courses/List.jsx'));
                        });
                    }
                },
                {
                    path: 'all',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/courses/List.jsx'));
                        });
                    }
                },
                {
                    path: ':courseId',
                    indexRoute:{
                        getComponent(location, cb) {
                            require.ensure([], require => {
                                cb(null, require('./containers/courses/Detail.jsx'));
                            });
                        }
                    },
                    childRoutes: [
                        {
                            path: 'discuss',
                            childRoutes: [
                                {
                                    getComponent(location, cb) {
                                        require.ensure([], require => {
                                            cb(null, require('./containers/courses/Discuss.jsx'));
                                        });
                                    },
                                    childRoutes: [
                                        {
                                            path: 'list',
                                            getComponent(location, cb) {
                                                require.ensure([], require => {
                                                    cb(null, require('./containers/courses/DiscussList.jsx'));
                                                });
                                            }
                                        },
                                        {
                                            path: 'noAnswer',
                                            getComponent(location, cb) {
                                                require.ensure([], require => {
                                                    cb(null, require('./containers/courses/DiscussNoAnswer.jsx'));
                                                });
                                            }
                                        },
                                        {
                                            path: 'propose',
                                            getComponent(location, cb) {
                                                require.ensure([], require => {
                                                    cb(null, require('./containers/courses/DiscussPropose.jsx'));
                                                });
                                            }
                                        },
                                        {
                                            path: 'answer',
                                            getComponent(location, cb) {
                                                require.ensure([], require => {
                                                    cb(null, require('./containers/courses/DiscussAnswer.jsx'));
                                                });
                                            }
                                        },
                                        {
                                            path: 'comment',
                                            getComponent(location, cb) {
                                                require.ensure([], require => {
                                                    cb(null, require('./containers/courses/DiscussComment.jsx'));
                                                });
                                            }
                                        }
                                    ]
                                },
                                {
                                    path: 'add',
                                    getComponent(location, cb) {
                                        require.ensure([], require => {
                                            cb(null, require('./containers/courses/AddDiscuss.jsx'));
                                        });
                                    }
                                },
                                {
                                    path: ':questionId',
                                    indexRoute: {
                                        getComponent(location, cb) {
                                            require.ensure([], require => {
                                                cb(null, require('./containers/courses/DiscussDetail.jsx'));
                                            });
                                        }
                                    },
                                    childRoutes: [
                                        {
                                            path: 'edit',
                                            indexRoute: {
                                                getComponent(location, cb) {
                                                    require.ensure([], require => {
                                                        cb(null, require('./containers/courses/AddDiscuss.jsx'));
                                                    });
                                                }
                                            },
                                            childRoutes: [
                                                {
                                                    path: ':answerId',
                                                    getComponent(location, cb) {
                                                        require.ensure([], require => {
                                                            cb(null, require('./containers/courses/AddDiscuss.jsx'));
                                                        });
                                                    }
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            path: 'statistics',
                            getComponent(location, cb) {
                                require.ensure([], require => {
                                    cb(null, require('./containers/courses/Statistics.jsx'));
                                });
                            }
                        },
                        {
                            path: 'chapters(/:chapterId)',
                            getComponent(location, cb) {
                                require.ensure([], require => {
                                    cb(null, require('./containers/courses/Chapter.jsx'));
                                });
                            }
                        },
                        {
                            path: 'paper',
                            getComponent(location, cb) {
                                require.ensure([], require => {
                                    cb(null, require('./containers/courses/Chapter.jsx'));
                                });
                            }
                        }
                    ]
                }
            ]
        }
    ]
};

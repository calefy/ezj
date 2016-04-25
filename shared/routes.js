
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
            path: 'courses',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/Classify'));
                });
            }
        },
        // 课程详情
        {
            path: 'courses/:courseId',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/courses/index'));
                });
            },
            /*
            indexRoute: {
                getComponent(location, cb) {
                    require.ensure([], require => {
                        cb(null, require('./containers/courses/Introduce'));
                    });
                }
            },
            childRoutes: [
                {
                    path: 'introduce',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/courses/Introduce'));
                        });
                    }
                },
                {
                    path: 'content',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/courses/Content'));
                        });
                    }
                },
                {
                    path: 'test',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/courses/Test'));
                        });
                    }
                }
            ]
            */
        },
        {
            path: 'courses/:courseId/chapters/:chapterId',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/Play'));
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
                    path: 'recharge',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/account/Recharge.jsx'));
                        });
                    }
                },
                {
                    path: 'orders',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/account/Order.jsx'));
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
                    path: 'all',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/study/All'));
                        });
                    }
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
                },
                {
                    path: 'result',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/study/Result'));
                        });
                    }
                }
            ]
        },
        //404页面
        {
            path: '404',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/404'));
                });
            }
        },
        //其他页面
        {
            path: 'help',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/other/index'));
                });
            },
            childRoutes: [
                {
                    path: 'about',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/other/About'));
                        });
                    }
                },
                {
                    path: 'contact',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/other/Contact'));
                        });
                    }
                },
                {
                    path: 'opinion',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/other/Opinion'));
                        });
                    }
                }
            ]
        },
        // 专题页
        {
            path: 'topic',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/topic'));
                });
            }
        },
        // cfc
        {
            path: 'topic/cfc',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/topic/Cfc'));
                });
            }
        },
        // cfc持续教育
        {
            path: 'topic/continue',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/topic/Continue'));
                });
            }
        },
        // 互联网金融
        {
            path: 'topic/finance',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/topic/Finance'));
                });
            }
        },
        // 证券投资
        {
            path: 'topic/security',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/topic/Security'));
                });
            }
        },
        {
            path: 'students/:studentId',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/Student.jsx'));
                });
            }
        },
        {
            path: 'lecturers/:lecturerId',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/Lecturer.jsx'));
                });
            }
        },
        // 视频播放页
        {
            path: 'video',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/Play'));
                });
            }
        },
        // 支付页
        {
            path: 'pay',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/Pay'));
                });
            }
        },
    ]
};

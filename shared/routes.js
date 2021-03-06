
/**
 * 需要登录控制，供onEnter使用
 *  - 假设服务器端与浏览器端都有同样的global数据：__INITIAL_STATE__ = { user: { isFetching: false, data: {...} } }
 *  - 上面假设还有个假设：浏览器端的初始数据是经过服务器端渲染的，包含user
 */
function isLogin() {
    return typeof __INITIAL_STATE__ === 'object' &&
            __INITIAL_STATE__.user &&
            __INITIAL_STATE__.user.data &&
            __INITIAL_STATE__.user.data.uid;
}
function needLogin(nextState, replaceState) {
    if (!isLogin()) {
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
            indexRoute: {
                getComponent(location, cb) {
                    require.ensure([], require => {
                        cb(null, require('./containers/Classify'));
                    });
                }
            },
            childRoutes: [
                {
                    path: ':courseId/chapters(/:chapterId)',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/Play'));
                        });
                    }
                },
                {
                    path: ':courseId(/:hash)',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/courses/Course.jsx'));
                        });
                    },
                },
            ],
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
            onEnter: needLogin,
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
            onEnter: needLogin,
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
                            cb(null, require('./containers/account/Contact.jsx'));
                        });
                    }
                },
                {
                    path: 'email',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/account/Contact.jsx'));
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
                    path: 'intro',
                    //onEnter: function (nextState, replaceState) {
                    //    if (isLogin()) {
                    //        replaceState(null, '/study/all');
                    //    }
                    //},
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/study/Intro.jsx'));
                        });
                    }
                },
                {
                    path: 'all',
                    onEnter: needLogin,
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/study/All'));
                        });
                    }
                },
                {
                    path: 'collect',
                    onEnter: needLogin,
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/study/Collect'));
                        });
                    }
                },
                {
                    path: 'test',
                    onEnter: needLogin,
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/study/Test'));
                        });
                    }
                },
                {
                    path: 'test/:examId/:sheetId',
                    onEnter: needLogin,
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
        //500页面
        {
            path: '500',
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/500.jsx'));
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
            indexRoute: {
                getComponent(location, cb) {
                    require.ensure([], require => {
                        cb(null, require('./containers/topic'));
                    });
                }
            },
            childRoutes: [
                // cfc
                {
                    path: 'cfc',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/topic/Cfc'));
                        });
                    }
                },
                // cfc持续教育
                {
                    path: 'continue',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/topic/Continue'));
                        });
                    }
                },
                // cfc持续教育test
                {
                    path: 'continue/test',
                    onEnter: needLogin,
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/topic/Test'));
                        });
                    }
                },
                // 互联网金融
                {
                    path: 'finance',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/topic/Finance'));
                        });
                    }
                },
                // 证券投资
                {
                    path: 'security',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/topic/Security'));
                        });
                    }
                },
                // 高级财富规划师
                {
                    path: 'plan',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/topic/Plan'));
                        });
                    }
                },
                // 互联网金融支付
                {
                    path: 'financial',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/topic/Financial'));
                        });
                    }
                },
                // 并购重组与市值管理
                {
                    path: 'merge',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/topic/Merge'));
                        });
                    }
                },
            ]
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
            onEnter: needLogin,
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/Pay'));
                });
            }
        },
        {
            path: 'pay-qrcode',
            onEnter: needLogin,
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/PayQrCode'));
                });
            }
        },
        // 手机端测验
        {
            path: 'm',
            childRoutes: [
                {
                    path: 'index',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/mobile/Index.jsx'));
                        });
                    }
                },
                {
                    path: 'exams',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/mobile/Mine'));
                        });
                    }
                },
                {
                    path: 'exams/:courseId/:examId(/:sheetId)',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/mobile/Test'));
                        });
                    }
                },
                {
                    path: 'account',
                    getComponent(location, cb) {
                        require.ensure([], require => {
                            cb(null, require('./containers/mobile/User'));
                        });
                    }
                },
            ]
        },
        // unipay页
        {
            path: 'topic/unipay',
            onEnter: function (nextState, replaceState) {
                if (isLogin()) {
                   replaceState(null, '/topic/financial');
                }
            },
            getComponent(location, cb) {
                require.ensure([], require => {
                    cb(null, require('./containers/topic/Unipay'));
                });
            }
        },
    ]
};

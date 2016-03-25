import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RoutingContext } from 'react-router'

import config           from '../../config';
import routes           from '../../shared/routes';
import configureStore   from '../../shared/store';
import ApiClient        from '../../shared/api/apiClientNode';
import UserApi          from '../../shared/api/User';

// 读取webpack输出的json文件，获取资源chunk，第一个为js，第二个为css
var resourceConfig = {
    publicPath: '/static/build/',
    assetsByChunkName: {
        main: [
            'entry.js',
            'styles.css'
        ]
    }
};
if (process.env.NODE_ENV === 'production') {
    const fs = require('fs');
    resourceConfig = JSON.parse(fs.readFileSync(__dirname + '/../../webpack.version.json', 'utf-8'));
}

function serverRendering(req, res) {
    let apiClient = new ApiClient({ prefix: config.apiPrefix });
    // 设置api请求需要的通用头
    apiClient.headers = {
        'X-Real-Ip' : req.get('x-real-ip'),
        'Cookie' : req.get('cookie')
    };

    // 优先获取登录数据
    const userApi = new UserApi({ apiClient });
    userApi.info()
        .then( info => {
            doRendering(req, res, apiClient, info);
        })
        .catch( error => {
            doRendering(req, res, apiClient);
        });

}
function doRendering(req, res, apiClient, user = {}) {
    // 因使用了 Material-UI，需要全局设置 navigator.userAgent
    global.navigator = { userAgent: req.get('User-Agent') };
    // 全局保持user信息，为了match时onEnter使用保持与前端代码一致
    global.__INITIAL_STATE__ = { user: Object.assign({ isFetching: false }, user) }; // 认为页面可访问时就已经加载了user信息

    match({ routes: routes, location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(err.message);
        } else if (redirectLocation) {
            res.status(302).redirect( redirectLocation.pathname + redirectLocation.search );
        } else if (!renderProps) {
            res.status(404).send('Page Not Found');
        } else {
            const store = configureStore(res.locals.state);

            fetchComponentsData( store.dispatch, renderProps, apiClient )
                .then(() => {
                    const componentHtml = renderToString(
                        <Provider store={store}>
                            <RoutingContext {...renderProps} />
                        </Provider>
                    );
                    const initState = store.getState();

                    return renderHtml( {componentHtml, initState, req} );
                })
                .then(html => res.end(html))
                .catch(err => {
                    console.log('[server render error]: ', err.stack);
                    res.end(err.message);
                });
        }
    });
}

/**
 * 自动从component中获取数据
 */
function fetchComponentsData( dispatch, props = {}, apiClient ) {
    const {components, params, location} = props;
    const promises = components.map( component => {
        return (component && component.fetchData) ? component.fetchData({dispatch, params, location, apiClient}) : null;
    });

    return Promise.all(promises);
}

/**
 * 渲染页面html
 */
function renderHtml({ componentHtml, initState, req }) {
    const publicPath = resourceConfig.publicPath;
    const assets = resourceConfig.assetsByChunkName.main;

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <title>紫荆教育</title>
    <link rel="shortcut icon" href="//www.ezijing.com/favicon.ico">
    <link rel="stylesheet" href="${publicPath}${assets[1]}">
    <!--[if lt IE 9]>
        <script src="/static/js/html5shiv.min.js"></script>
        <script src="/static/js/selectivizr-min.js"></script>
    <![endif]-->
</head>
<body>
    <div id="app">${componentHtml}</div>

    <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initState)};
        window._g_server_time = ${Date.now()};

        window.CKEDITOR_GETURL = function(resource) {
            if (/^http|file/.test(resource)) { return resource; }
            return 'http://cdn.ckeditor.com/4.5.7/standard/' + resource.replace(/^\\\//, '');
        }
    </script>
    <!--[if lt IE 9]>
        <script src="/static/js/es5-shim.min.js"></script>
        <script src="/static/js/es5-sham.min.js"></script>
        <script src="/static/js/console-polyfill.js"></script>
    <![endif]-->

    <script src="${publicPath}${assets[0]}"></script>
</body>
</html>`;
}


module.exports = serverRendering;
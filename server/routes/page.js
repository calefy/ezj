import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { match, RoutingContext } from 'react-router'
import { getApiRequestHeader } from '../../shared/libs/utils';

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

const PAGE_TITLE = '紫荆教育-清华大学五道口金融学院旗下品牌'; // 记录页面标题

function serverRendering(req, res) {
    let apiClient = new ApiClient({ prefix: config.apiPrefix });
    // 设置api请求需要的通用头
    apiClient.headers = getApiRequestHeader(req);

    // 优先获取登录数据
    const userApi = new UserApi({ apiClient });
    let cacheKey = apiClient._getCacheKey('post', 'sso/get_user_info'); // 因apiClient仅针对get缓存，这个接口是post，因此特别处理
    userApi.info()
        .then( info => {
            apiClient._cache[cacheKey] = info;
            doRendering(req, res, apiClient, info);
        })
        .catch( error => {
            apiClient._cache[cacheKey] = error;
            doRendering(req, res, apiClient, error);
        });

}
function doRendering(req, res, apiClient, user = {}) {
    res.locals.pageTitle = PAGE_TITLE;
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
            res.redirect('/404');
        } else {
            const store = configureStore(res.locals.state);

            fetchComponentsData( store.dispatch, renderProps, apiClient, res )
                .then(() => {
                    const componentHtml = renderToString(
                        <Provider store={store}>
                            <RoutingContext {...renderProps} />
                        </Provider>
                    );
                    const initState = store.getState();

                    return renderHtml( {componentHtml, initState, req, res} );
                })
                .then(html => res.end(html))
                .catch(err => {
                    console.log('[server render error]: ', err.stack);
                    //res.end(err.message);
                    res.redirect('/500');
                });
        }
    });
}

/**
 * 自动从component中获取数据
 */
function fetchComponentsData( dispatch, props = {}, apiClient, res ) {
    const {components, params, location} = props;
    const promises = components.map( component => {
        if (component && component.pageTitle) res.locals.pageTitle = component.pageTitle;
        return (component && component.fetchData) ? component.fetchData({dispatch, params, location, apiClient}) : null;
    });

    return Promise.all(promises);
}

/**
 * 渲染页面html
 */
function renderHtml({ componentHtml, initState, req, res }) {
    const publicPath = resourceConfig.publicPath;
    const assets = resourceConfig.assetsByChunkName.main;

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=yes" />  -->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" >
    <meta name="description" content="紫荆教育依托清华大学和五道口金融学院丰富的教育资源,秉承其严谨务实的教学理念,紧密结合宏观经济转型过程中,企业和个人知识结构升级的需求,融理论大家、实践专家、顶尖专业机构集体智慧于一体,构建以金融为核心的商业实战知识体系,努力为中国社会商业素质提高贡献一己之力.课程分类：企业理财顾问(CFC),理财规划师,财富资产管理,金融创业投资项目.">
    <meta name="keywords" content="cfc,理财规划师,企业理财顾问师,投资理财顾问,金融理财师,理财培训,企业融资,国家理财规划师,财富管理,资产管理,个人财富管理,证券投资,信托投资,房地产投资,艺术品投资,固定资产管理,证券投资基金,证券投资分析,证券投资分析师,创业金融,创业投资,创业团队,如何创业,怎样创业,自主创业,年轻人如何创业,大学生如何创业,大学生自主创业">
    <title>${res.locals.pageTitle}</title>
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
    <noscript><img src="//piwik.ezijing.com/piwik.php?idsite=1" class="hide" alt="" /></noscript>
</body>
</html>`;
}


module.exports = serverRendering;

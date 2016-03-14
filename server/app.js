import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';


const app = express();
const isDev = process.env.NODE_ENV !== 'production';

// 全局设置
app.disable('x-powered-by');
app.set('port', process.env.PORT || 3000);
if (isDev) {
    app.set('view cache', false);
    // 自动打包
    const webpackConfig = require('../webpack.config');
    const config = require('../config');
    if (config.autopack) {
        const webpack = require('webpack');
        const webpackDevMiddleware = require('webpack-dev-middleware');
        app.use( webpackDevMiddleware(
            webpack( webpackConfig ),
            // 必须配置publicPath项，否则无法运行
            { noInfo: true, publicPath: webpackConfig.output.publicPath }
        ));
    }
}

// 应用工具
app.use('/static', express.static('public/static'));
app.use(logger(isDev ? 'dev' : 'combined'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '600kb' })); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false, limit: '600kb' })); // for parsing application/x-www-form-urlencoded

// /api 请求处理
app.use('/api', require('./routes/api'))
// 同构页面处理
app.get('*', require('./routes/page'));


app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(err.status || 500);
  res.send({ message: err.message });
});

// 开启服务
app.listen(app.get('port'), function() {
  console.log('Express server 🌎  listening on port ' + app.get('port') + '[' + (process.env.NODE_ENV || 'develop') + ']');
});


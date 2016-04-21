var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './client/app.js',
    output: {
        path: __dirname + '/public/static/build', // webpack-dev-middleware 不允许该项使用相对地址，否则 memory-fs 会报错
        filename: 'entry' + (isProd ? '.[chunkhash:6]' : '') +'.js',
        chunkFilename: '[id]' + (isProd ? '.[chunkhash:base64:6]' : '') + '.js',
        publicPath: '/static/build/' // webpack-dev-middleware 要求该项开头必须是 `/`
    },
    externals: [ 'fs', 'node-fetch', 'form-data' ], // 因node调用的apiClient也放到了shared中，需要过滤打包
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER : JSON.stringify(true),
                NODE_ENV: JSON.stringify( process.env.NODE_ENV || 'development' )
            }
        }),
        new ExtractTextPlugin('styles' + (isProd ? '.[contenthash:6]' : '') + '.css', {allChunks: true}),
    ].concat(isProd ? [ // 生产环境使用plugins
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.LimitChunkCountPlugin({maxChunks: 2}),
            new webpack.optimize.MinChunkSizePlugin({minChunkSize: 1000}),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ] : []),
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'es3ify!babel', exclude: /node_modules/},
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
            { test: /\.(png|gif|jpe?g)$/, loader: 'url?limit=512&name=[hash:base64:6].[ext]'},
            { test: /\.(swf|eot|svg|ttf|woff)$/, loader: 'file?name=[hash:base64:6].[ext]'}
        ],
        noParse: [ /ckeditor/, /video/ ]
    },
    resolve: {
        alias: {
            css: __dirname + '/shared/assets/css',
            img: __dirname + '/shared/img',
            video: __dirname + '/public/static/js/videoJs.js',
            player: __dirname + '/public/static/swf/Player.swf'
        }
    }
};


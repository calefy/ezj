# NODE-EZIJING

新版 ezijing 项目，基于node+react同构技术搭建。


## 部署运行

```sh
# 安装依赖包
npm install
# 拷贝当前环境依赖配置
cp config.dev.js config.js
# 运行node服务，可以用`pm2`、`nodemon`等工具启动
node server/runner.js
```

## 发布上线前*需要打包*

打包需要使用 ezijingWebApp/node-ezijing 这个git的地址，个人名下的打包有时会合并不上来。

1. 拷贝中心项目：`git clone git@git.ezijing.com:ezijingwebapp/node-ezijing.git center-node-ezijing`
2. 在新拷贝的项目中安装依赖：`cd center-node-ezijing && npm install`
3. 每次打包前拉取最新代码： `git pull`
4. 执行打包命令：`npm run-script publish` （该命令会生成public/static/build中的文件，并修改webpack.version.json）
5. 提交新生成的文件: `git add -A && git commit -m 'publish'`
6. 推送到线上：`git push`

然后到jenkins发布即可。


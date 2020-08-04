/* eslint valid-jsdoc: "off" */

'use strict';
const fs = require("fs");
const path = require("path");
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1596436166082_2549';

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
    };

    config.jwt = {
        secret: "suyuemin"
    };
    config.sequelize = {
        dialect: 'mysql',
        database: 'suyuemincms',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '111111',
        timezone: '+08:00',
    }

    config.security = {
        csrf: {
            enable: false, // 前后端分离，post请求不方便携带_csrf
        },
        domainWhiteList: [
            '*',
        ], //配置白名单
    };

    config.cors = {
        origin: "*", //允许所有跨域访问，注释掉则允许上面 白名单 访问
        credentials: true, // 允许跨域请求携带cookies
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };

    config.view = {
        defaultViewEngine: 'nunjucks'
    }

    //设置静态文件目录
    config.static = {
        prefix: '/', //访问路径
        dir: path.join(appInfo.baseDir, 'app/public'), //设置静态文件目录
    };

    return {
        ...config,
        ...userConfig,
    };
};
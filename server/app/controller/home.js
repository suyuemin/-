'use strict';

const Controller = require('egg').Controller;
// 引入一个‘检测用户使用手机还是电脑’的模块
const checkAgent = require('../utils/checkagent');

class HomeController extends Controller {
    async index() {
        const { ctx } = this;

        // 返回值:
        // 0 手机
        // 1 平板
        // 2 pc
        const ua = checkAgent(ctx.request.header["user-agent"]);
        // let data = await this.ctx.service.website.
    }
}

module.exports = HomeController;
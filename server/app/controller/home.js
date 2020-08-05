'use strict';

const Controller = require('egg').Controller;
// 引入一个‘检测用户使用手机还是电脑’的模块
const checkAgent = require('../utils/checkagent');

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        // 检测设备
        const ua = checkAgent(ctx.request.header["user-agent"]);
        // data： 书、博客、推荐书、推荐博客、推荐视频
        let data = await this.ctx.service.website.getHomePageData();
        this.ctx.body = data;
        //     if (ua) {
        //         await ctx.render("pc/home.html", data)
        //     } else {
        //         await ctx.render("phone/home.html", data);
        //     }
    }
}

module.exports = HomeController;
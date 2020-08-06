'use strict';

const Controller = require('egg').Controller;

class SuyueminController extends Controller {
    async index() {
        await this.ctx.render("admin/index.html")
    }

    async login() {
        // 获取post请求参数  username,password
        const body = this.ctx.request.body;
        // 比较数据库中用户表的用户名和密码是否匹配
        // 登录成功返回token
        // 登录失败返回false
        const token = await this.ctx.service.user.login(body.username, body.password)
        if (token) {
            this.ctx.body = {
                code: 20000,
                message: true,
                token: token
            }
        } else {
            this.ctx.body = {
                code: 40000,
                message: false,
            }
        }
    }
}

module.exports = SuyueminController;
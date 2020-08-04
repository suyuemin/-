'use strict';

const Controller = require('egg').Controller;
class UserController extends Controller {

    // 添加用户
    async create() {
        // 获取post请求参数   
        // {username,password}
        const body = await this.ctx.request.body;
        // 向数据库添加用户
        // 添加成功返回 true
        // 添加失败返回  false
        let result = await this.ctx.service.user.createUser(body);
        if (result) {
            this.ctx.body = {
                code: 20000,
                message: true
            }
        } else {
            this.ctx.body = {
                code: 40000,
                message: false
            }
        }
    }

    // 删除用户
    async destroy() {
        // 获取请求地址中的用户id
        const id = await this.ctx.params.id;
        // 根据id删除数据库中对应的用户
        // 删除成功返回 true
        // 删除失败返回 false
        let result = await this.ctx.service.user.deleteUser(id);
        if (result) {
            this.ctx.body = {
                code: 20000,
                message: true
            }
        } else {
            this.ctx.body = {
                code: 50000,
                message: false
            }
        }
    }


    // 查看用户列表
    async index() {

        // 从数据库中查用户
        // 查询成功返回 查询结果
        // 查询失败返回  null
        let result = await this.ctx.service.user.getUserList();
        if (result) {
            this.ctx.body = {
                code: 20000,
                message: true,
                data: result
            }
        } else {
            this.ctx.body = {
                code: 20000,
                message: false,
            }
        }

    }


    // 修改用户信息
    async update() {
        // 获取post请求参数  password
        const body = await this.ctx.request.body;
        // 获取要修改的用户id
        const id = await this.ctx.params.id;
        // 根据用户id，修改用户密码
        // 修改成功返回 true
        // 修改失败返回 false
        const result = await this.ctx.service.user.resetPassword(id, body.password)
        if (result) {
            this.ctx.body = {
                code: 20000,
                message: true,
            }
        } else {
            this.ctx.body = {
                code: 30000,
                message: false,
            }
        }

    }




}

module.exports = UserController;
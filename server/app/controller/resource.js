'use strict';

const Controller = require('egg').Controller;
// 导入检测设备的模块（手机或者电脑）
const checkAgent = require("../utils/checkagent")
class ResourceController extends Controller {

    // 添加视频
    async create() {
        // 获取post请求参数   
        // {title,code,url}
        const body = await this.ctx.request.body;
        // 向数据库添加资源
        // 添加成功返回 true
        // 添加失败返回  false
        let result = await this.ctx.service.resource.createResource(body);
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

    // 删除资源
    async destroy() {
        // 获取请求地址中的资源id
        const id = await this.ctx.params.id;
        // 根据id删除数据库中对应的资源
        // 删除成功返回 true
        // 删除失败返回 false
        let result = await this.ctx.service.resource.deleteResource(id);
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

    // 修改资源
    async update() {
        // 获取post请求参数  title、code、url
        const body = await this.ctx.request.body;
        // 获取要修改的资源id
        const id = await this.ctx.params.id;
        // 根据资源id修改数据库中对应的资源信息
        let result = await this.ctx.service.resource.updateResource(id, body);
        if (result) {
            this.ctx.body = {
                code: 20000,
                message: true
            }
        } else {
            this.ctx.body = {
                code: 30000,
                message: false
            }
        }
    }

    // 查看资源
    async index() {
        // 获取地址栏请求参数  page:当前页  total：每页显示数量
        const query = await this.ctx.request.query;
        // 根据请求参数从数据库中查询对应资源
        // 查询成功返回 查询结果
        // 查询失败返回  null
        let result = await this.ctx.service.resource.getResourceList(query);
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

    // 下载列表
    async getResourceList() {
        const { ctx } = this;
        // 检测设备
        const ua = checkAgent(ctx.request.header["user-agent"]);
        // 返回资源列表、推荐书、推荐博客、title
        let data = await this.ctx.service.website.getResourceList();
        // this.ctx.body = data;
        if (ua) {
            await ctx.render("pc/resource.html", data);
        } else {
            await ctx.render("phone/resource.html", data);
        }
    }


}

module.exports = ResourceController;
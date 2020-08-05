'use strict';

const Controller = require('egg').Controller;
// 导入检测设备的模块（手机或者电脑）
const checkAgent = require("../utils/checkagent")
class BlogController extends Controller {

    // 添加博客
    async create() {
        // 获取post请求参数   
        // {title,img,md_text,html_text}
        const body = await this.ctx.request.body;
        // 向数据库添加博客   
        // 添加成功返回 true
        // 添加失败返回  false
        let result = await this.ctx.service.blog.createBlog(body);
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

    // 删除博客
    async destroy() {
        // 获取请求地址中的博客id
        const id = await this.ctx.params.id;
        // 根据id删除数据库中对应的博客
        // 删除成功返回 true
        // 删除失败返回 false
        let result = await this.ctx.service.blog.deleteBlog(id);
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

    // 修改博客
    async update() {
        // 获取post请求参数
        const body = await this.ctx.request.body;
        // 获取要修改的博客id
        const id = await this.ctx.params.id;
        // 根据博客id修改数据库中对应的博客信息
        let result = await this.ctx.service.blog.updateBlog(id, body);
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

    // 查看博客
    async index() {
        // 获取get请求参数  page:当前页   total：每页展示条数
        const query = await this.ctx.request.query;
        // 根据当前页和每一页博客总条数从数据库中查询博客
        // 查询成功返回博客列表
        // 查询失败返回空 null
        let result = await this.ctx.service.blog.getBlogList(query);
        if (result) {
            this.ctx.body = {
                code: 20000,
                message: true,
                data: result
            }
        } else {
            this.ctx.body = {
                code: 30000,
                message: false,
            }
        }

    }

    // 查看指定的一篇博客详情
    async show() {
        // 获取博客的id
        const id = await this.ctx.params.id;
        // 根据博客id从数据库中查询对应博客详情
        // 查询成功返回 查询结果
        // 查询失败返回  null
        let result = await this.ctx.service.blog.getBlogDetail(id);
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

    // 博客列表页面展示
    async getBlogList() {
        const { ctx } = this
        // 检测用户用的是手机浏览还是电脑浏览
        // pc: 1
        // mobile：0
        const ua = checkAgent(ctx.request.header["user-agent"]);
        // 向数据库中查询前100条的博客、推荐博客、推荐书、title
        // 查询成功返回查询结果
        // 查询失败返回null
        let data = await this.ctx.service.website.getBlogList();
        // this.ctx.body = data;
        if (ua) {
            // pc端
            await ctx.render("pc/blog.html", data);
        } else {
            // 移动端
            await ctx.render("phone/blog.html", data);
        }

    }

    // 查看具体某一篇博客的详情展示页面
    async getBlogDetail() {
        const { ctx } = this;
        // 检测用户用的是手机浏览还是电脑浏览
        // pc: 1
        // mobile：0
        const ua = checkAgent(ctx.request.header["user-agent"]);
        // 获取博客id
        const id = this.ctx.params.id;
        // 向数据库中查询id对应的博客详情、推荐博客、推荐书、title
        // 查询成功返回查询结果
        // 查询失败返回null
        let data = await this.ctx.service.website.getBlogDetail(id);
        // this.ctx.body = data;
        if (ua) {
            await ctx.render("pc/blog_detail.html", data);
        } else {
            await ctx.render("phone/blog_detail.html", data);
        }
    }

}

module.exports = BlogController;
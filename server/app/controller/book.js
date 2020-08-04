'use strict';

const Controller = require('egg').Controller;
// 导入检测设备的模块（手机或者电脑）
const checkAgent = require("../utils/checkagent")
class BookController extends Controller {

    // 添加书籍
    async create() {
        // 获取post请求参数   
        // {title,img,orderby}
        const body = await this.ctx.request.body;
        // 向数据库添加书籍   
        // 添加成功返回 true
        // 添加失败返回  false
        let result = await this.ctx.service.book.createBook(body);
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

    // 删除书籍
    async destroy() {
        // 获取请求地址中的书籍id
        const id = await this.ctx.params.id;
        // 根据id删除数据库中对应的书籍
        // 删除成功返回 true
        // 删除失败返回 false
        let result = await this.ctx.service.book.deleteBook(id);
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

    // 修改书籍
    async update() {
        // 获取post请求参数
        const body = await this.ctx.request.body;
        // 获取要修改的书籍id
        const id = await this.ctx.params.id;
        // 根据书籍id修改数据库中对应的书籍信息
        let result = await this.ctx.service.book.updateBook(id, body);
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

    // 查看书籍
    async index() {
        // 获取get请求参数  page:当前页   total：每页展示书籍数
        const query = await this.ctx.request.query;
        // 根据当前页和每一页书籍总数从数据库中查询书籍
        // 查询成功返回书籍列表
        // 查询失败返回空 null
        let result = await this.ctx.service.book.getBookList(query);
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

    // 博客列表页面
    async getBlogList() {
        // 检测用户用的是手机浏览还是电脑浏览
        // pc: 1
        // mobile：0
        // const ua = checkAgent(ctx.request.header["user-agent"]);
        // 向数据库中查询前100条的博客
        // 查询成功返回前100条的博客blog
        // 查询失败返回null
        let result = await this.ctx.service.website.getBlogList()
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

}

module.exports = BookController;
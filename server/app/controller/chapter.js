'use strict';

const Controller = require('egg').Controller;
// 导入检测设备的模块（手机或者电脑）
const checkAgent = require("../utils/checkagent")
class ChapterController extends Controller {

    // 添加章
    async create() {
        // 获取post请求参数   
        // {title,book_id,orderby}
        const body = await this.ctx.request.body;
        // 向数据库添加章   
        // 添加成功返回 true
        // 添加失败返回  false
        let result = await this.ctx.service.chapter.createChapter(body);
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

    // 删除章
    async destroy() {
        // 获取请求地址中的章id
        const id = await this.ctx.params.id;
        // 根据id删除数据库中对应的章
        // 删除成功返回 true
        // 删除失败返回 false
        let result = await this.ctx.service.chapter.deleteChapter(id);
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

    // 修改章
    async update() {
        // 获取post请求参数
        const body = await this.ctx.request.body;
        // 获取要修改的章id
        const id = await this.ctx.params.id;
        // 根据章id修改数据库中对应的章信息
        let result = await this.ctx.service.chapter.updateChapter(id, body);
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

    // 查看所有章
    async index() {
        // 获取要查询章的书籍的id
        const book_id = await this.ctx.query.book_id;
        // 根据博客书籍id从数据库中查询对应所有章节
        // 查询成功返回 查询结果
        // 查询失败返回  null
        let result = await this.ctx.service.chapter.getChapterList(book_id);
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
                data: '失败'
            }
        }

    }



}

module.exports = ChapterController;
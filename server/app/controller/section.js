'use strict';

const Controller = require('egg').Controller;
// 导入检测设备的模块（手机或者电脑）
const checkAgent = require("../utils/checkagent")
class SectionController extends Controller {

    // 添加节
    async create() {
        // 获取post请求参数   
        // {title,orderby,md_text,html_text,chapter_id,}
        const body = await this.ctx.request.body;
        // 向数据库添加节   
        // 添加成功返回 true
        // 添加失败返回  false
        let result = await this.ctx.service.section.createSection(body);
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

    // 删除节
    async destroy() {
        // 获取请求地址中的节id
        const id = await this.ctx.params.id;
        // 根据id删除数据库中对应的节
        // 删除成功返回 true
        // 删除失败返回 false
        let result = await this.ctx.service.section.deleteSection(id);
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

    // 修改节
    async update() {
        // 获取post请求参数
        const body = await this.ctx.request.body;
        // 获取要修改的节id
        const id = await this.ctx.params.id;
        // 根据章id修改数据库中对应的节信息
        let result = await this.ctx.service.section.updateSection(id, body);
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

    // 查看章的节列表
    async index() {
        // 获取章的id
        const chapter_id = await this.ctx.query.chapter_id;
        // 根据章id从数据库中查询对应所有节
        // 查询成功返回 查询结果
        // 查询失败返回  null
        let result = await this.ctx.service.section.getSectionList(chapter_id);
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

    // 查看某一节详情
    async show() {
        // 获取节的id
        const id = this.ctx.params.id;
        // 根据节id从数据库中查询节详情
        // 查询成功返回 查询结果
        // 查询失败返回 null
        const result = await this.ctx.service.section.getSectionDetail(id);
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

    // 查看某一节的详情
    async getSectionDetail() {
        const { ctx } = this;
        // 获取节的id
        const id = this.ctx.params.id;
        // 根据节id查询   节内容、本书章节目录、所有书籍
        let data = await this.ctx.service.website.getSectionDetail(id);
        this.ctx.body = data;
        // if (ua) {
        //     await this.ctx.render("pc/book_detail.html", data);
        // } else {
        //     await this.ctx.render("phone/book_detail.html", data);
        // }
    }
}

module.exports = SectionController;
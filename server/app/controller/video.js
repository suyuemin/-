'use strict';

const Controller = require('egg').Controller;
// 导入检测设备的模块（手机或者电脑）
const checkAgent = require("../utils/checkagent")
class VideoController extends Controller {

    // 添加视频
    async create() {
        // 获取post请求参数   
        // {title,img,iframe_url}
        const body = await this.ctx.request.body;
        // 向数据库添加视频   
        // 添加成功返回 true
        // 添加失败返回  false
        let result = await this.ctx.service.video.createVideo(body);
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

    // 删除视频
    async destroy() {
        // 获取请求地址中的视频id
        const id = await this.ctx.params.id;
        // 根据id删除数据库中对应的节
        // 删除成功返回 true
        // 删除失败返回 false
        let result = await this.ctx.service.video.deleteVideo(id);
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

    // 修改视频
    async update() {
        // 获取post请求参数
        const body = await this.ctx.request.body;
        // 获取要修改的视频id
        const id = await this.ctx.params.id;
        // 根据视频id修改数据库中对应的视频信息
        let result = await this.ctx.service.video.updateVideo(id, body);
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

    // 查看视频列表
    async index() {
        // 获取地址栏请求参数  page:当前页  total：每页显示数量
        const query = await this.ctx.request.query;
        // 根据请求参数从数据库中查询对应视频
        // 查询成功返回 查询结果
        // 查询失败返回  null
        let result = await this.ctx.service.video.getVideoList(query);
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

    // 查看某一视频详情
    async show() {
        // 获取视频的id
        const id = this.ctx.params.id;
        // 根据节id从数据库中查询节详情
        // 查询成功返回 查询结果
        // 查询失败返回 null
        const result = await this.ctx.service.video.getVideoDetail(id);
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

    // 视频展示列表
    async getVideoList() {
        const { ctx } = this;
        // 检测手机端还是pc  pc=> 1    phone=> 0
        const ua = checkAgent(ctx.request.header["user-agent"]);
        // 返回前100个视频、推荐书、推荐博客、推荐一个视频、title  
        const data = await this.ctx.service.website.getVideoList();
        this.ctx.body = data;
        // if (ua) {
        //     await ctx.render("pc/video.html", data);
        // } else {
        //     await ctx.render("phone/video.html", data);
        // }
    }

    // 查看某一视频详情
    async getVideoDetail() {
        const { ctx } = this;
        // 检测手机端还是pc  pc=> 1    phone=> 0
        const ua = checkAgent(ctx.request.header["user-agent"]);
        // 获取视频id
        let id = this.ctx.params.id;
        // 返回id对应的视频类别、该类别的所有视频、title  
        const data = await this.ctx.service.website.getVideoDetail(id);
        this.ctx.body = data;
        // if (ua) {
        //     await ctx.render("pc/video_detail.html", data);
        // } else {
        //     await ctx.render("phone/video_detail.html", data);
        // }

    }
}

module.exports = VideoController;
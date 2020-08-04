'use strict';

const Service = require('egg').Service;

class VideoService extends Service {

    // 添加节
    async createVideo({
        title,
        img,
        iframe_url
    }) {
        try {
            await this.app.model.Video.create({
                title,
                img,
                iframe_url
            })
            return true
        } catch (e) {
            return false
        }

    }

    // 删除视频
    async deleteVideo(id) {
        try {
            await this.app.model.Video.destroy({
                where: {
                    id
                }
            })
            return true
        } catch (e) {
            return false
        }

    }

    // 修改视频
    async updateVideo(
        id, {
            title,
            img,
            iframe_url
        }
    ) {
        try {
            await this.app.model.Video.update({
                title,
                img,
                iframe_url
            }, {
                where: {
                    id
                }
            })
            return true;
        } catch (e) {
            return false;
        }

    }

    // 通过视频类别查找视频
    async getVideoList(query) {
        try {
            // 获取当前页
            const number = parseInt(query.page);
            // 获取每页显示数量
            const degree = parseInt(query.total);
            // 计算出起始数
            const start = number * degree - degree;
            const videoList = await this.app.model.Video.findAll({
                limit: [start, degree]
            })

            // 将视频查询结果返回
            return videoList;
        } catch (e) {
            return null
        }
    }

    // 查看某一视频详情
    async getVideoDetail(id) {
        try {
            const video = await this.app.model.Video.findOne({
                where: {
                    id
                }
            });
            return video
        } catch (error) {
            return false
        }
    }




}

module.exports = VideoService;
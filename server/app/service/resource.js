'use strict';

const Service = require('egg').Service;

class ResourceService extends Service {

    // 添加资源
    async createResource({
        title,
        code,
        url
    }) {
        try {
            await this.app.model.Resource.create({
                title,
                code,
                url
            })
            return true
        } catch (e) {
            return false
        }

    }

    // 删除视频
    async deleteResource(id) {
        try {
            await this.app.model.Resource.destroy({
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
    async updateResource(
        id, {
            title,
            code,
            url
        }
    ) {
        try {
            await this.app.model.Resource.update({
                title,
                code,
                url
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

    // 通过query查询条件查询资源列表
    async getResourceList(query) {
        try {
            // 获取当前页
            const number = parseInt(query.page);
            // 获取每页显示数量
            const degree = parseInt(query.total);
            // 计算出起始数
            const start = number * degree - degree;
            const resourceList = await this.app.model.Resource.findAll({
                limit: [start, degree]
            })

            // 将资源查询结果返回
            return resourceList;
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

module.exports = ResourceService;
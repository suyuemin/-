'use strict';

const Service = require('egg').Service;

class BlogService extends Service {

    // 添加博客
    async createBlog({
        title,
        img,
        md_text,
        html_text
    }) {
        try {
            await this.app.model.Blog.create({
                title,
                img,
                md_text,
                html_text
            })
            return true
        } catch (e) {
            return false
        }

    }

    // 删除博客
    async deleteBlog(id) {
        try {
            await this.app.model.Blog.destroy({
                where: {
                    id
                }
            })
            return true
        } catch (e) {
            return false
        }

    }

    // 修改博客
    async updateBlog(
        id, {
            title,
            img,
            md_text,
            html_text
        }
    ) {
        try {
            await this.app.model.Blog.update({
                title,
                img,
                md_text,
                html_text
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

    // 查看博客
    async getBlogList(query) {
        try {
            // 获取url中的当前博客页
            const number = parseInt(query.page);
            // 获取url中的每一页博客总条数
            const degree = parseInt(query.total);
            // 计算出要展示的博客的起始页
            const start = number * degree - degree;
            // 根据当前页和每一页博客总条数从数据库中查询博客
            const blogList = await this.app.model.Blog.findAll({
                limit: [start, degree]
            })

            // 将博客查询结果返回
            return blogList;
        } catch (e) {
            return null
        }
    }

    // 查看具体某一篇博客详情
    async getBlogDetail(id) {
        try {
            const blog = await this.app.model.Blog.findOne({
                where: {
                    id
                }
            })
            return blog
        } catch (e) {
            return null;
        }

    }




}

module.exports = BlogService;
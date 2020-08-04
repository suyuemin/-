'use strict';

const Service = require('egg').Service;
// querystring模块提供用于解析和格式化URL查询字符串的实用程序。
const queryString = require('querystring');
// 加密解密模块
const crypto = require('crypto');

class WebsitService extends Service {

    //首页
    async getHomePageData() {
        let bookList = await this.ctx.service.book.getBookList({ page: 1, total: 3 }) //推荐书
        let blogList = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 }) //推荐博客
        let recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 1 }) //推荐书
        let recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 }) //推荐博客
        let videoList = await this.ctx.service.video.getVideoList({ page: 1, total: 3 }) //推荐一个视频
        let title = "首页-suyuemin"
        return {
            bookList,
            blogList,
            videoList,
            recommendBook,
            recommendBlog,
            title
        }
    };

    //电子书列表
    async getBookList() {
        let bookList = await this.ctx.service.book.getBookList({ page: 1, total: 100 }); //所有书籍
        let recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 3 }) //推荐书
        let recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 }) //推荐博客
        let recommendVideo = await this.ctx.service.video.getVideoList({ page: 1, total: 3 }) //推荐一个视频
        let title = "学习手册-suyuemin"
        return {
            bookList,
            recommendBook,
            recommendBlog,
            recommendVideo,
            title,
        }
    }

    //电子书详情 -- 待完善，获取目录
    async getSectionDetail(id) {
        let section = await this.ctx.service.section.getSectionDetail(id) //通过笑节id获取内容
        let menu = await this.ctx.service.section.getMenuBySectionId(id) //通过书的id获取这本书的章节目录
        let bookList = await this.ctx.service.book.getBookList({ page: 1, total: 100 }); //获取所有书籍
        return {
            section,
            bookList,
            menu,
            title: section.title + "-suyuemin"
        }
    }

    //博客列表
    async getBlogList() {
        try {
            // 方法获取博客前100条数据
            let blog = await this.ctx.service.blog.getBlogList({ page: 1, total: 100 });

            // 获取前3条博客作为推荐博客 
            let recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 });

            // 获取前3本书作为推荐书
            let recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 3 })

            // 标题
            let title = "博客-suyuemin"

            // 将所有查询结果使用对象返回
            return {
                blog,
                recommendBook,
                recommendBlog,
                title,
            };
        } catch (e) {
            return null;
        }




        // // 获取前3本书籍作为推荐书籍
        // let recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 3 })

        // // 标题
        // let title = "博客-suyuemin"
        return {
            blog,
            // recommendBook,
            // recommendBlog,
            // title,
        }
    }

    //博客详情
    async getBlogDetail(id) {
        let blog = await this.ctx.service.blog.getBlogDetail(id) //查看一篇博客
        let recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 3 }) //推荐书
        let recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 }) //推荐博客
        let title = blog.title + "-suyuemin" //标题
        return {
            blog: blog,
            recommendBook,
            recommendBlog,
            title
        }
    }

    //下载列表
    async getResourceList() {
        let resourceList = await this.ctx.service.resource.getResourceList({ page: 1, total: 100 }) //获取所有资源
        let recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 1 }) //推荐书
        let recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 }) //推荐博客
        let title = "资源下载-suyuemin" //标题
        return {
            resourceList,
            recommendBook,
            recommendBlog,
            title,
        }
    }

    //视频列表
    async getVideoList() {
        let videoList = await this.ctx.service.video.getVideoList({ page: 1, total: 100 }) //查看所有视频类别以及视频类别所属的视频
        let recommendBook = await this.ctx.service.book.getBookList({ page: 1, total: 3 }) //推荐书
        let recommendBlog = await this.ctx.service.blog.getBlogList({ page: 1, total: 3 }) //推荐博客
        let recommendVideo = await this.ctx.service.video.getVideoList({ page: 1, total: 3 }) //推荐一个视频
        let title = '视频-suyuemin' //标题名称
        return {
            videoList,
            recommendBook,
            recommendBlog,
            recommendVideo,
            title,
        }
    }

    //获取视频类别详情
    async getVideoDetail(id) {
        let video = await this.ctx.service.video.getVideoDetail(id); //通过视频类别id获取视频类别
        let videoList = await this.ctx.service.video.getVideoList({ page: 1, total: 100 }); //通过视频类别的id获取这个视频类别的所有视频
        let title = video.title + "-suyuemin"
        return {
            video,
            videoList,
            title
        }
    }
}

module.exports = WebsitService;
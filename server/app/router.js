'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

    // 网页
    // router.get('/', controller.home.index);
    // 博客展示列表
    router.get("/blog", controller.blog.getBlogList);

    // 后台功能接口
    // 登录
    router.post('/api/login', controller.admin.login);

    // 后台登录页展示
    // router.get('/admin', controller.admin.index);

    // 书籍的管理 , app.middleware.checktoken()
    router.resources('book', '/api/book', controller.book)

    // 章的管理  , app.middleware.checktoken()
    router.resources('chapter', '/api/chapter', controller.chapter)

    // 节的管理 , app.middleware.checktoken()
    router.resources('section', '/api/section', controller.section)

    // 博客管理
    router.resources('blog', '/api/blog', controller.blog)

    // 视频的管理, app.middleware.checktoken()
    router.resources('video', '/api/video', controller.video)

    // 下载的管理, app.middleware.checktoken()
    router.resources('resources', '/api/resource', controller.resource)

    // 用户的管理 , app.middleware.checktoken()
    router.resources('user', '/api/user', controller.user)

    // 添加内容的图片
    router.post('/api/upload', controller.upload.index)
};
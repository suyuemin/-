'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

    // 网页
    // 首页
    router.get('/', controller.home.index);
    // 博客展示列表
    router.get("/blog", controller.blog.getBlogList);
    // 查看具体某一篇博客的详情
    router.get('/blog/:id', controller.blog.getBlogDetail);
    // 视频展示列表
    router.get('/video', controller.video.getVideoList);
    // 查看某一视频详情
    router.get('/video/:id', controller.video.getVideoDetail);
    // 资源展示列表
    router.get('/resource', controller.resource.getResourceList);
    // 书籍展示列表
    router.get('/book', controller.book.getBookList);
    // 查看某一书籍详情、章节列表
    router.get('/book/:id', controller.book.toFirstSection);
    // 查看某一节的详情
    router.get('/section/:id', controller.section.getSectionDetail);

    // 后台功能接口
    // 登录
    router.post('/api/login', controller.admin.login);

    // 后台登录页展示
    router.get('/admin', controller.admin.index);

    // 书籍的管理 app.middleware.checktoken(),
    router.resources('book', '/api/book', controller.book)

    // 章的管理  , app.middleware.checktoken()
    router.resources('chapter', '/api/chapter', app.middleware.checktoken(), controller.chapter)

    // 节的管理 , app.middleware.checktoken()
    router.resources('section', '/api/section', app.middleware.checktoken(), controller.section)

    // 博客管理
    router.resources('blog', '/api/blog', app.middleware.checktoken(), controller.blog)

    // 视频的管理, app.middleware.checktoken()
    router.resources('video', '/api/video', app.middleware.checktoken(), controller.video)

    // 下载的管理, app.middleware.checktoken()
    router.resources('resources', '/api/resource', app.middleware.checktoken(), controller.resource)

    // 用户的管理 , app.middleware.checktoken()
    router.resources('user', '/api/user', app.middleware.checktoken(), controller.user)

    // 添加内容的图片
    router.post('/api/upload', controller.upload.index)
};
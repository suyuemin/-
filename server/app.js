module.exports = app => {
    // beforeStart是egg的生命周期函数,启动应用时执行
    app.beforeStart(async function() {
        // 创建数据表的方法
        // await app.model.sync({ force: true }); // 开发环境使用，会删除数据表
        await app.model.sync({});
    })
}
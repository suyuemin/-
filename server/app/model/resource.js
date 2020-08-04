module.exports = app => {
    const { STRING } = app.Sequelize;
    const Resource = app.model.define('resource', {
        // 资源名称
        title: STRING,
        // 提取码
        code: STRING,
        // 链接到的百度网盘地址
        url: STRING,
    })
    return Resource
}
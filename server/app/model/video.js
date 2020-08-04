module.exports = app => {
    const { STRING } = app.Sequelize;
    const Video = app.model.define('video', {
        // 视频名称
        title: STRING,
        // 视频的封面图片
        img: STRING,
        // B站视频地址
        ifrname_url: STRING,

    })

    return Video;
}
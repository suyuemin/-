module.exports = app => {
    const { STRING, TEXT } = app.Sequelize;

    const Blog = app.model.define('blog', {
        // 博客标题
        title: STRING,
        // 博客封面图片
        img: STRING,
        // md格式富文本内容
        md_text: TEXT,
        //html格式文本内容
        html_text: TEXT,
    })
    return Blog
}
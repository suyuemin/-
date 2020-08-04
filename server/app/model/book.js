module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;

    const Book = app.model.define('book', {
        // 书名
        title: STRING,
        // 排序权重
        orderby: INTEGER,
        // 书的封面图片
        img: STRING,
    })
    return Book;
}
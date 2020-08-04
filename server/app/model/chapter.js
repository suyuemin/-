module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
    const Chapter = app.model.define('chapter', {
        // 章节名称
        title: STRING,
        // 权重排序
        orderby: INTEGER,
    })

    // //外键，指向电子书
    Chapter.associate = function() {
        app.model.Chapter.belongsTo(app.model.Book, {
            foreignKey: 'book_id',
            as: 'book'
        })
    }

    return Chapter
}
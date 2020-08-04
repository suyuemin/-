module.exports = app => {
    const { STRING, INTEGER, TEXT } = app.Sequelize;
    const Section = app.model.define('section', {
        // 节的题目
        title: STRING,
        // 权重排序
        orderby: INTEGER,
        // md格式富文本内容
        md_text: TEXT,
        // html格式文本内容
        html_text: TEXT,
    })

    Section.associate = function() { //所属与那本书，指向书籍的主键
        app.model.Section.belongsTo(app.model.Chapter, {
            foreignKey: 'chapter_id',
            as: 'chapter'
        })
    }

    return Section;
}
'use strict';

const Service = require('egg').Service;

class ChapterService extends Service {

    // 添加章
    async createChapter({
        title,
        book_id,
        orderby
    }) {
        try {
            await this.app.model.Chapter.create({
                title,
                book_id: Number(book_id),
                orderby
            })
            return true
        } catch (e) {
            return false
        }

    }

    // 删除章
    async deleteChapter(id) {
        try {
            await this.app.model.Chapter.destroy({
                where: {
                    id
                }
            })
            return true
        } catch (e) {
            return false
        }

    }

    // 修改章
    async updateChapter(
        id, {
            title,
            book_id,
            orderby
        }
    ) {
        try {
            await this.app.model.Chapter.update({
                title,
                book_id,
                orderby
            }, {
                where: {
                    id
                }
            })
            return true;
        } catch (e) {
            return false;
        }

    }

    // 通过书的ID获取此书籍的章节
    async getChapterList(book_id) {
        try {
            const chapterList = await this.app.model.Chapter.findAll({
                'order': [
                    ['orderby', 'asc'],
                ],
                include: [{
                    model: this.app.model.Book,
                    as: 'book'
                }],
                where: {
                    book_id: book_id
                }
            })

            // 将章查询结果返回
            return chapterList;
        } catch (e) {
            return null
        }
    }





}

module.exports = ChapterService;
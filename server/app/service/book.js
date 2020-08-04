'use strict';

const Service = require('egg').Service;

class BookService extends Service {

    // 添加博客
    async createBook({
        title,
        img,
        orderby
    }) {
        try {
            await this.app.model.Book.create({
                title,
                img,
                orderby
            })
            return true
        } catch (e) {
            return false
        }

    }

    // 删除博客
    async deleteBook(id) {
        try {
            await this.app.model.Book.destroy({
                where: {
                    id
                }
            })
            return true
        } catch (e) {
            return false
        }

    }

    // 修改书籍
    async updateBook(
        id, {
            title,
            img,
            orderby
        }
    ) {
        try {
            await this.app.model.Book.update({
                title,
                img,
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

    // 查看书籍
    async getBookList(query) {
        try {
            // 获取url中的当前页
            const number = parseInt(query.page);
            // 获取url中的每一页书籍总数
            const degree = parseInt(query.total);
            // 计算出要展示的博客的起始页
            const start = number * degree - degree;
            // 根据当前页和每一页书籍总数从数据库中查询书籍
            const bookList = await this.app.model.Book.findAll({
                limit: [start, degree]
            })

            // 将博客查询结果返回
            return bookList;
        } catch (e) {
            return null
        }
    }





}

module.exports = BookService;
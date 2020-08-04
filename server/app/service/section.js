'use strict';

const Service = require('egg').Service;

class SectionService extends Service {

    // 添加节
    async createSection({
        title,
        orderby,
        md_text,
        html_text,
        chapter_id,
    }) {
        try {
            await this.app.model.Section.create({
                title,
                orderby: Number(orderby),
                md_text,
                html_text,
                chapter_id,
            })
            return true
        } catch (e) {
            return false
        }

    }

    // 删除节
    async deleteSection(id) {
        try {
            await this.app.model.Section.destroy({
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
    async updateSection(
        id, {
            title,
            orderby,
            md_text,
            html_text,
            chapter_id
        }
    ) {
        try {
            await this.app.model.Section.update({
                title,
                orderby,
                md_text,
                html_text,
                chapter_id
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

    // 通过章的ID获取此书籍的节
    async getSectionList(chapter_id) {
        try {
            const sectionList = await this.app.model.Section.findAll({
                'order': [
                    ['orderby', 'asc'],
                ],
                include: [{
                    model: this.app.model.Chapter,
                    as: 'chapter'
                }],
                where: {
                    chapter_id
                }
            })

            // 将章查询结果返回
            return sectionList;
        } catch (e) {
            return null
        }
    }

    // 查看某一节详情
    async getSectionDetail(id) {
        try {
            const section = await this.app.model.Section.findOne({
                where: {
                    id
                }
            });
            return section
        } catch (error) {
            return false
        }
    }




}

module.exports = SectionService;
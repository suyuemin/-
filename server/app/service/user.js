'use strict';

const Service = require('egg').Service;
// 导入用来加密密码的模块
let md5 = require('md5-node');

class UserService extends Service {

    // 添加用户
    async createUser({
        username,
        password
    }) {
        try {
            await this.app.model.User.create({
                username,
                password: md5(password)
            })
            return true
        } catch (e) {
            return false
        }

    }

    // 删除用户
    async deleteUser(id) {
        try {
            await this.app.model.User.destroy({
                where: {
                    id
                }
            })
            return true
        } catch (e) {
            return false
        }

    }


    // 查看所有用户
    async getUserList() {
        try {
            const userList = await this.app.model.User.findAll()
            return userList
        } catch (error) {
            return null
        }
    }

    //重置账号
    async resetPassword(id, password) {
        try {
            this.app.model.User.update({
                password: md5(password),
            }, {
                where: {
                    id
                }
            })
            return true
        } catch (e) {
            return false
        }
    }

    // 用户登录
    async login(username, password) {
        try {
            let passwordMd5 = md5(password);
            const user = await this.app.model.User.findOne({
                where: {
                    username
                }
            })
            if (user) {
                let psd = user.dataValues.password
                let usr = user.dataValues.username
                if (username == usr && passwordMd5 == psd) {
                    const token = this.app.jwt.sign({
                        username: username
                    }, this.app.config.jwt.secret);
                    return token
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (e) {
            // 数据库操作失败
            return false;
        }

    }



}

module.exports = UserService;
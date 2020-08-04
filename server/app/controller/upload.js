'use strict';

const Controller = require('egg').Controller;
// 导入node核心模块  fs、path
const fs = require('fs')
const path = require('path')
    // 用于接收图片
const pump = require('mz-modules/pump')
class UploadController extends Controller {
    // 上传图片
    async index() {
        // 读取文件流
        const stream = await this.ctx.getFileStream();
        // 文件名
        const filename = new Date().getTime() + path.extname(stream.filename).toLowerCase();
        // 上传目的文件夹  项目根目录下的app/public/uploads
        const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
        // 写入文件流
        const writeStream = fs.createWriteStream(target);
        // 将图片文件写入到目标文件夹中
        await pump(stream, writeStream);
        this.ctx.body = {
            code: 20000,
            data: {
                name: filename,
                // file: `/uploads/${filename}` //正式地址
                file: `http://127.0.0.1:7001/uploads/${filename}` //临时服务器地址
            }
        }
        console.log(this.ctx.body)
    }
}

module.exports = UploadController;
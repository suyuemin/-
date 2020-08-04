module.exports = app => {
    const { STRING } = app.Sequelize;
    const User = app.model.define('user', {
        // 用户名
        username: STRING,
        // 密码
        password: STRING,
    })

    return User
}
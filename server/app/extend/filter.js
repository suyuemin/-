exports.dateformate = time => {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let result = `${year}年${month}月${day}日`;
    return result
};

exports.configdata = (str) => {
    let appid = 'wx2efb9723cf3582d5';
    let redirect_uri = 'http://www.xiaozhoubg.com/qrlogin';
    let state = Math.floor(Math.random() * 10000);
    let wxLoginUrl = `https://open.weixin.qq.com/connect/qrconnect?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_login&state=${state}#wechat_redirect`;

    data = {
        url: wxLoginUrl
    }
    return data[str];
}

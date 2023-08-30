import { GET, POST } from '../api/index'

export const login = async (data) => {
    return GET( '/user/login', data)
}

export const userList = async (data) => {
    return GET('/user/list',data)
}
let nodeMail = require('nodemailer')

let transporter = nodeMail.createTransport({
    service: 'qq', //类型qq邮箱
    port: 465,//上文获取的port
    secure: true,//上文获取的secure
    auth: {
        user: '664689413@qq.com@qq.com', // 发送方的邮箱，可以选择你自己的qq邮箱
        pass: 'vwrxoclvhsyjbbea' // 上文获取的stmp授权码
    }
});
export const sendCode = async () =>{
    return POST('/api/email',async (req, res) => {
        const email = req.body.email
        const code = String(Math.floor(Math.random() * 1000000)).padEnd(6, '0') //生成6位随机验证码
        //发送邮件
        const mail = {
            from: `"瑛瑛测试开发"<664689413@qq.com>`,// 发件人
            subject: '验证码',//邮箱主题
            to: email,//收件人，这里由post请求传递过来
            // 邮件内容，用html格式编写
            html: `
             <p>您好！</p>
             <p>您的验证码是：<strong style="color:orangered;">${code}</strong></p>
             <p>如果不是您本人操作，请无视此邮件</p>
         `
        };
        await transporter.sendMail(mail, (err, info) => {
            if (!err) {
                res.json({msg: "验证码发送成功"})
            } else {
                res.json({msg: "验证码发送失败，请稍后重试"})
            }
        })
    })
}

// export const logout = () => {
//     return request(
//         url: '/logout',
//         method: 'post',
//     });
// };
//
// export const register = async () => {
//     return request({
//         url: '/register',
//         method: 'post',
//     });
// };
//

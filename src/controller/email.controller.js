/**
 * Created by trungquandev.com's author on 18/02/2020.
 * emailController.js
 */
const mailer = require('../utils/mailer')

let sendMail = async (req, res) => {
    try {
        // Lấy data truyền lên từ form phía client
        const { to, subject, data } = req.body;
        const {NAME, EMAIL, PHONE, ADDRESS, CITY} = data;
        console.log('data', data); // MongLV log fix bug
        // Thực hiện gửi email
        // await mailer.sendMail(to, subject, body)
        await mailer.sendMail(to, subject, 'TEST')

        // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
        return res.json({ message: 'SUCCESS' });
    } catch (error) {
        // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
        console.log(error)
        res.send(error)
    }
}

module.exports = {
    sendMail: sendMail
}

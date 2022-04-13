/**
 * Created by trungquandev.com's author on 16/10/2019.
 * src/controllers/auth.js
 */
const jwtHelper = require('../helpers/jwt.helper');
const db = require('../database/db');
const generateUUID = require('../utils/function/generateUUID');
const md5 = require('md5');

// Thời gian sống của token
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || '1h';

// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'access-token-secret-example-trungquandev.com-green-cat-a@';

// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || '3650d';

// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret-example-trungquandev.com-green-cat-a@';

/**
 * controller login
 * @param {*} req
 * @param {*} res
 */
let login = async (req, res) => {
    try {
        const email = req.body.email;
        if (!req.body.email || !req.body.password) {
            return res.status(404).json({
                message: 'Add wrong data',
            });
        }

        const user_db = db.get('users').find({ email: email });
        const data = user_db.value();

        // Đầu tiên Kiểm tra xem email người dùng đã tồn tại trong hệ thống hay chưa?
        if (data) {
            // Nếu tồn tại user thì sẽ lấy password mà user truyền lên, băm ra và so sánh với mật khẩu của user lưu trong Database
            if (md5(md5(req.body.password)) === data.password) {
                const __data = {
                    ...data,
                };
                delete __data.password; // Xóa password khỏi hệ dữ liệu
                delete __data.timestamps; // Xóa timestamps khỏi hệ dữ liệu
                delete __data.visit_timestamps; // Xóa visit_timestamps khỏi hệ dữ liệu
                delete __data.info; // Xóa info khỏi hệ dữ liệu
                delete __data.refreshToken; // Xóa  refreshToken khỏi hệ dữ liệu

                const user = {
                    id: data.id,
                }
                const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);
                const refreshToken = await jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenLife);

                const _refreshToken = data.refreshToken.length === 0 ? refreshToken : data.refreshToken;

                // Lưu refreshToken vào db users
                const timestamps = new Date().getTime();
                if(data.refreshToken.length === 0) {
                    user_db.assign({
                        refreshToken: refreshToken,
                        visit_timestamps: [...data.visit_timestamps, timestamps]
                    }).value();
                    db.write(); // Lưu dữ liệu
                }

                return res.status(200).json({ ...__data, refreshToken: _refreshToken, accessToken });
            } else {
                // Nếu password sai thì reject: Password is incorrect.
                return res.status(403).json({
                    message: 'Password is incorrect',
                });
            }
        } else {
            // - Nếu chưa tồn tại thì reject: User not found.
            return res.status(404).json({
                message: 'User not found',
            });
        }
        // Trong ví dụ demo này mình sẽ coi như tất cả các bước xác thực ở trên đều ok, mình chỉ xử lý phần JWT trở về sau thôi nhé:
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

/**
 * controller refreshToken
 * @param {*} req
 * @param {*} res
 */
let refreshToken = async (req, res) => {
    // User gửi mã refresh token kèm theo trong body

    const refreshTokenFromClient = req.body.refreshToken;
    const user_db = db.get('users').find({ refreshToken: refreshTokenFromClient });
    const user = user_db.value();

    // Nếu như tồn tại refreshToken truyền lên và nó cũng nằm trong tokenList của chúng ta
    if (user) {
        try {
            // Verify kiểm tra tính hợp lệ của cái refreshToken và lấy dữ liệu giải mã decoded
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);

            // Thông tin user lúc này các bạn có thể lấy thông qua biến decoded.data
            const data = decoded.data;

            const accessToken = await jwtHelper.generateToken(data, accessTokenSecret, accessTokenLife);

            // gửi token mới về cho người dùng
            return res.status(200).json({ accessToken });
        } catch (error) {
            // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
            res.status(403).json({
                message: 'Invalid refresh token.',
            });
        }
    } else {
        // Không tìm thấy token trong request
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
};

let create = async (req, res) => {
    try {
        if (req.body.email && req.body.password) {

            const user_db = db.get('users').find({ email: req.body.email });
            const data = user_db.value();

            // Kiểm tra đã tồn tại email chưa
            if(!data) {
                const obj = {
                    id: generateUUID(),
                    version: '0.0.1',
                    nickname: '',
                    email: req.body.email,
                    info: '',
                    password: md5(md5(req.body.password)),
                    verify: false,
                    status: true, // true: là người dùng ở trạng thái hoạt động, false: là người dùng đã khóa tài khoản
                    timestamps: new Date().getTime(),
                    visit_timestamps: [new Date().getTime()],
                    refreshToken: '',
                };
                db.get('users').push(obj).write();
                res.json({ message: 'SUCCESS' });
            } else {
                res.json({ message: 'used email' });
            }


            // TODO: cần xử lý phần gửi email xác thực ở đây
        } else {
            res.status(404).json({
                message: 'ERROR DATA',
            });
        }
    } catch (e) {
        console.log('e', e);
    }
};
module.exports = {
    login,
    refreshToken,
    create,
};

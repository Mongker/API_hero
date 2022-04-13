/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 10/04/2022
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const express = require('express');
let router = express.Router();

let initChatRoutes = (app) => {
    router.route('/api/chat');
    return app.use(router);
};

module.exports = initChatRoutes;

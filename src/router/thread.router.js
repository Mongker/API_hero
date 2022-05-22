/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 16/05/2022
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

const express = require('express');
const router = express.Router();

const {POST, GET, UPDATE, DELETE} = require('../controllers/thread.controller');

const initThreadRouter = (app) => {
    router.route('/api/threads').get(GET).post(POST);
    router.route('/api/threads/:id').put(UPDATE).delete(DELETE);
    return app.use(router);
}

module.exports = initThreadRouter;

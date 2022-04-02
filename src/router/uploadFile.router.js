const express = require('express');
const fileController = require('../controller/file.controller');
const multer = require('multer');
const imageUploader = multer({ dest: './images/' });
let router = express.Router();

let initUploadFileRoutes = (app) => {
    router.route('/api/file/upload').post(imageUploader.single('file'), fileController.sentFile);
    router.route('/api/file/:name/:date/:nameFile').get(fileController.getFile);
    return app.use(router);
};

module.exports = initUploadFileRoutes;

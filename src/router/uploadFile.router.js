const express = require('express');
const fileController = require('../controller/file.controller');
const cacheUrlFileController = require('../controller/image.controller');
const multer = require('multer');
const imageUploader = multer({ dest: './images/' });
let router = express.Router();

let initUploadFileRoutes = (app) => {
    router.route('/api/file/upload').post(imageUploader.single('file'), fileController.sentFile);
    router.route('/api/file/:name/:date/:nameFile').get(fileController.getFile);
    router.route('/api/file-info').get(cacheUrlFileController.get).post(cacheUrlFileController.store);
    router.route('/api/file-info/:name').put(cacheUrlFileController.update);
    router.route('/api/file-info/:id').get(cacheUrlFileController.detail).put(cacheUrlFileController.update).delete(cacheUrlFileController.remove);
    return app.use(router);
};

module.exports = initUploadFileRoutes;

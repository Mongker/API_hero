const express = require('express');
const fileController = require('../controllers/file.controller');
const cacheUrlFileController = require('../controllers/image.controller');
const AuthMiddleWare = require('../middleware/auth.middleware');
const multer = require('multer');
const imageUploader = multer({ dest: './images/' });
let router = express.Router();

let initUploadFileRoutes = (app) => {
    router.route('/api/file/upload').post(AuthMiddleWare.isAuth, imageUploader.single('file'), fileController.sentFile);
    router.route('/api/file/:name/:date/:nameFile').get(AuthMiddleWare.isAuth, fileController.getFile);
    router.route('/api/file-public/upload').post(imageUploader.single('file'), fileController.sentFile);
    router.route('/api/file-public/public/:date/:nameFile').get(fileController.getFile);
    // router.route('/api/file/:name/:date/:nameFile').get(fileController.getFile);
    router.route('/api/file-info').get(AuthMiddleWare.isAuth, cacheUrlFileController.get).post(cacheUrlFileController.store);
    router.route('/api/file-info/:name').put(cacheUrlFileController.update);
    router.route('/api/file-info/:id').get(cacheUrlFileController.detail).put(cacheUrlFileController.update).delete(cacheUrlFileController.remove);
    return app.use(router);
};

module.exports = initUploadFileRoutes;

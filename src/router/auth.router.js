/**
 * https://trungquandev.com/nodejs-xac-thuc-nguoi-dung-su-dung-jwt-token-refreshtoken/
 * Tham khảo tại đây
 */
const express = require('express');
const router = express.Router();
const AuthMiddleWare = require('../middleware/auth.middleware');
const AuthController = require('../controllers/auth.controller');
const FriendController = require('../controllers/friend.controller');

/**
 * Init all APIs on your application
 * @param {*} app from express
 */
let initAuthRouter = (app) => {
    router.post('/api/author/login', AuthController.login);
    router.post('/api/author/refresh-token', AuthController.refreshToken);
    router.post('/api/author/create', AuthController.create);

    // Sử dụng authMiddleware.isAuth trước những api cần xác thực
    router.use(AuthMiddleWare.isAuth);
    // List Protect APIs:
    router.get('/api/friends', FriendController.friendLists);
    // router.get("/example-protect-api", ExampleController.someAction);

    return app.use(router);
};

module.exports = initAuthRouter;

const express = require('express');
const ladingpageController = require('../controllers/ladingpage.controller');
let router = express.Router();

let initLandingPageRoutes = (app) => {
    router.route('/').get(ladingpageController.getClientSettingGoogleSheet);
    router.route('/thank-you.html').get(ladingpageController.postSuccess);
    return app.use(router);
};

module.exports = initLandingPageRoutes;

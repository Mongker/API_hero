const express = require('express');
const homepageController = require('../controller/googlesheet.controller');

let router = express.Router();

let initGoogleSheetRoutes = (app) => {
    router.route('/api/google_sheet/client')
    .get(homepageController.getClientGoogleSheet)
    .post(homepageController.addClientGoogleSheet);
    return app.use(router);
};

module.exports = initGoogleSheetRoutes;

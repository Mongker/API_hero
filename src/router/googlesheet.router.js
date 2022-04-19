const express = require('express');
const homepageController = require('../controllers/googlesheet.controller');

let router = express.Router();

let initGoogleSheetRoutes = (app) => {
    router.route('/api/google_sheet/client')
    .post(homepageController.addClientGoogleSheet).get(homepageController.getClientGoogleSheet);
    router.route('/api/google_sheet/client/:id').get(homepageController.getClientGoogleSheet)
    return app.use(router);
};

module.exports = initGoogleSheetRoutes;

import express from "express";
import ladingpageController from "../controller/ladingpage.controller";

let router = express.Router();

let initLandingPageRoutes = (app) => {
    router.route('/').get(ladingpageController.getClientSettingGoogleSheet);
    router.route('/thank-you.html').get(ladingpageController.postSuccess);
    return app.use(router);
};

module.exports = initLandingPageRoutes;

import express from 'express';
import resourcesAssets from '../controller/resources.controller';

let router = express.Router();

let initResourcesRoutes = (app) => {
    router.route('/assets/:folder/:name').get(resourcesAssets.getResourcesAssets);
    router.route('/cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/:name').get(resourcesAssets.getCDN);
    return app.use(router);
};

module.exports = initResourcesRoutes;

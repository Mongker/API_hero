const express = require('express');

//controller
const { sendMail } = require('../controllers/email.controller');

// const
const sliderRouter = express.Router();

sliderRouter.route('/api/sent-mail').post(sendMail);
module.exports = sliderRouter;

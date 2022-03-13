const express = require('express');

//controller
const { sendMail } = require('../controller/email.controller');

// const
const sliderRouter = express.Router();

sliderRouter.route('/api/sent-mail').post(sendMail);
module.exports = sliderRouter;

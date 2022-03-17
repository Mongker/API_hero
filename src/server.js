require('dotenv').config();
// server.js
// const express = require('express');
import express from 'express';
import es6Renderer from 'express-es6-template-engine';
import path from 'path';
import morgan from 'morgan';
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Router
const sliderRouter = require('./router/slider.router');
const uploadRouter = require('./router/upload.router');
const emailRouter = require('./router/email.router');
import initGoogleSheetRoutes from './router/googlesheet.router';
import initResourcesRoutes from './router/resources.router';
import initLandingPageRoutes from './router/ladipage.router';

// DATA
const port = process.env.PORT || 1999;

// option mongoose
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.URL_DBOnline, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
    () => {
        console.log('Database is connected');
    },
    (err) => {
        console.log('Can not connect to the database ' + err);
    },
);

// engine
app.set('view engine', 'html');
app.engine('html', es6Renderer);
app.set('views', path.join(__dirname, 'views/apecmandalakimboi.apecgroup.net'));
app.set('view engine', 'html');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

// app.use(cors(corsOptions));
// app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Router
app.use(sliderRouter);
app.use(emailRouter);
app.use('/api/file', uploadRouter);
initGoogleSheetRoutes(app);
initResourcesRoutes(app);
initLandingPageRoutes(app)

app.listen(port, function () {
    console.log(`Server is running on Port: http://localhost:${port}`);
});

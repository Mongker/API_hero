require('dotenv').config();
// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Router

const sliderRouter = require('./router/slider.router');
const uploadRouter = require('./router/upload.router');
const emailRouter = require('./router/email.router');

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

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Router
app.use(sliderRouter);
app.use(emailRouter);
app.use('/api/file', uploadRouter);

app.listen(port, function () {
    console.log(`Server is running on Port: http://localhost:${port}`);
});

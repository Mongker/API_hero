require('dotenv').config();
const express = require('express');
// const es6Renderer = require('express-es6-template-engine');
// const path = require('path');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

// const mongoose = require('mongoose');

// Router
// const sliderRouter = require('./router/slider.router');
const emailRouter = require('./router/email.router');
const initGoogleSheetRoutes = require('./router/googlesheet.router');
const initResourcesRoutes = require('./router/resources.router');
const initLandingPageRoutes = require('./router/ladipage.router');
const initUploadFileRoutes = require('./router/uploadFile.router');
const initChatRoutes = require('./router/chat.router');
const initRocketRoutes = require('./router/rocketIo.router');
const initAuthRouter = require('./router/auth.router');

// DATA
const port = process.env.PORT || 1999;

// option mongoose
// mongoose.set('useFindAndModify', false);
// mongoose.connect(process.env.URL_DBOnline, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
//     () => {
//         console.log('Database is connected');
//     },
//     (err) => {
//         console.log('Can not connect to the database ' + err);
//     },
// );

// engine
// app.set('view engine', 'html');
// app.engine('html', es6Renderer);
// app.set('views', path.join(__dirname, 'views/apecmandalakimboi.apecgroup.net'));
// app.set('view engine', 'html');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};


// app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const server = http.createServer(app);

// Router
// app.use(sliderRouter);
initRocketRoutes(server); // Xử lý roketIO
app.use(emailRouter); // api xử dụng gửi email theo yêu cầu
initGoogleSheetRoutes(app); // Thao tác với google sheet phần người dùng
initLandingPageRoutes(app); // Website của Phúc
initUploadFileRoutes(app); // Xử lý hình ảnh
initChatRoutes(app); // Chat theo thời gian thực
initAuthRouter(app); // Xử lý nghiệp vụ tải khoản và check tải khoản

// Thư viện dữ liệu website của KH Phúc
initResourcesRoutes(app);


server.listen(port, function () {
    console.log(`Server is running on Port: http://localhost:${port}`);
});

const express = require('express');
const uploadRouter = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// container
// const {GET, POST} = require('../controller/admin.controller');
function getMaxId() {
    let max = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        max += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return `${max}`;
}

const imageUploader = multer({ dest: './images/' });
uploadRouter.post('/api/file/upload', imageUploader.single('file'), (req, res) => {
    const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
    const {_name} = req.body;
    const d = new Date();
    let year = d.getFullYear();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    const name = _name || 'public'
    const pathFolder = `./images/${day}-${month}-${year}`
    try {
        if (!fs.existsSync(pathFolder)){
            fs.mkdirSync(pathFolder)
        }
        if (!fs.existsSync(pathFolder + `/${name}`)){
            fs.mkdirSync(pathFolder + `/${name}`)
        }
    } catch (err) {
        console.error(err)
    }
    let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
    orgName = orgName.trim().replace(/ /g, '-');
    const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
    // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
    // const newFullPath = `${fullPathInServ}-${orgName}`;
    const link_img = `${getMaxId()}-${orgName.replace(//g, '').replace(/�/g, '').replace(/ /g, '')}`;
    const newFullPathUbuntu = `images/${day}-${month}-${year}/${name}/${link_img}`; // Ubuntu
    // const newFullPathWin = `images\\`+link_img; // Win 10
    fs.renameSync(fullPathInServ, newFullPathUbuntu);
    res.json({
        status: true,
        message: 'file uploaded',
        fileNameInServer: newFullPathUbuntu.replace('images/', ''),
    });
});

uploadRouter.get('/api/file/:name/:date/:nameFile', (req, res) => {
    const {name, date, nameFile} = req.params;
    if (!name && !date && !nameFile) {
        return res.send({
            status: false,
            message: 'no filename specified',
        });
    }
    res.sendFile(path.resolve(`./images/${name}/${date}/${nameFile}`));
});
module.exports = uploadRouter;

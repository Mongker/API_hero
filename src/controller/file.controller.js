const fs = require('fs');
const path = require('path');
const { Worker } =  require('worker_threads');
const resize = require('../utils/function/resize');

function getMaxId() {
    let max = '';
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        max += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return `${max}`;
}
let sentFile = async (req, res) => {
    const processedFile = req.file; // MULTER xử lý và gắn đối tượng FILE vào req
    if(!processedFile) {
        return res.json({
            status: false,
            message: 'need to send files',
        });
    }
    const { name_key } = req.body;
    const d = new Date();
    let year = d.getFullYear();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    const name = name_key || 'public';
    const pathFolder = `./images/${name}`;
    try {
        if (!fs.existsSync(pathFolder)) {
            fs.mkdirSync(pathFolder);
        }

        if (!fs.existsSync('./images/webp')) {
            fs.mkdirSync('./images/webp');
        }

        if (!fs.existsSync(pathFolder + `/${day}-${month}-${year}`)) {
            fs.mkdirSync(pathFolder + `/${day}-${month}-${year}`);
        }
    } catch (err) {
        console.error(err);
    }
    let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
    orgName = orgName.trim().replace(/ /g, '-');
    const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
    // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
    // const newFullPath = `${fullPathInServ}-${orgName}`;
    const link_img = `${getMaxId()}-${orgName.replace(//g, '').replace(/�/g, '').replace(/ /g, '')}`;
    const newFullPathUbuntu = `images/${name}/${day}-${month}-${year}/${link_img}`; // Ubuntu
    // const newFullPathWin = `images\\`+link_img; // Win 10
    fs.renameSync(fullPathInServ, newFullPathUbuntu);
    return res.json({
        status: true,
        message: 'file uploaded',
        fileNameInServer: newFullPathUbuntu.replace('images/', ''),
    });
}

let getFile = async (req, res) => {
    const { name, date, nameFile } = req.params;
    const {width, show} = req.query;
    if (!name && !date && !nameFile) {
        return await res.send({
            status: false,
            message: 'no filename specified',
        });
    }
    const pathFile = path.resolve(`./images/${name}/${date}/${nameFile}`)
    if(show) {
        return res.sendFile(pathFile);
    } else {
        const worker =  new Worker(path.resolve('./src/utils/function/resizeImage.js'), {
            workerData: { pathFile: pathFile, width: Number(width), format: 'webp', name: nameFile }
        });
        let sentPath = {
            name: pathFile,
        }
        await worker.once("message", async result => {
            console.log('result', result); // MongLV log fix bug
            sentPath.name = await path.resolve('./' + result);
            if (!fs.existsSync(path.resolve(sentPath.name))) {
                console.log('123', pathFile); // MongLV log fix bug
                return await resize(pathFile, 'webp', Number(width)).pipe(res);
            } else {
                console.log('456', sentPath.name); // MongLV log fix bug
                return await res.sendFile(sentPath.name);
            }
        });

        await worker.on("error", error => {
            console.log('error', error);
        });

        await worker.on("exit", exitCode => {
            console.log('exitCode', exitCode);
        })
    }
}

module.exports = {
    sentFile,
    getFile,
}

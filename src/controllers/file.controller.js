const fs = require('fs');
const path = require('path');
const { Worker } = require('worker_threads');
const resize = require('../utils/function/resize');
const axios = require('axios');
const db = require('../database/db');

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
    const idsViewString = req?.query?.idsView || '[]';
    const idsView = JSON.parse(idsViewString);
    if (!processedFile) {
        return res.json({
            status: false,
            message: 'need to send files',
        });
    }
    const d = new Date();
    let year = d.getFullYear();
    let day = d.getDate();
    let month = d.getMonth() + 1;
    const name = req?.jwtDecoded?.data?.id || 'public';
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
    const idsNameFile = orgName.split('.');
    const typeFile = idsNameFile[idsNameFile.length - 1];
    const link_img = `${getMaxId()}-${getMaxId()}`;
    const newFullPathUbuntu = `images/${name}/${day}-${month}-${year}/${link_img}.${typeFile}`; // Ubuntu
    // const newFullPathWin = `images\\`+link_img; // Win 10
    fs.renameSync(fullPathInServ, newFullPathUbuntu);
    const pathUrl = newFullPathUbuntu.replace('images/', '');
    const path = name === 'public' ? '/api/file-public/' : '/api/file/';

    await res.json({
        status: true,
        message: 'file uploaded',
        fileNameInServer: path + pathUrl,
    });
    await axios.post(process.env.URL_BASE + '/api/file-info', {
        folder: name,
        url: path + pathUrl,
        fileName: link_img,
        size: processedFile.size | 0,
        idsView: [name, ...idsView],
    });
};

const TYPE_IMAGE = ['png', 'gif', 'jpeg', 'jpg', 'webp'];

let getFile = async (req, res) => {
    const { name, date, nameFile } = req.params;
    let _name = name || 'public';

    if (_name !== 'public') {
        const id = req?.jwtDecoded?.data?.id;
        const file_db = await db.get('file').find({ url: req.path }).value();
        if (!(Array.isArray(file_db.idsView) && file_db.idsView.includes(id))) {
            return await res.status(403).send({
                status: false,
                message: '403',
            });
        }
    }
    const { width, show } = req.query;
    const pathFile = path.resolve(`./images/${_name}/${date}/${nameFile}`);
    const idsNameFile = nameFile.split('.');
    const typeFile = idsNameFile[idsNameFile.length - 1];
    const _nameFile = idsNameFile[0];

    if (!fs.existsSync(pathFile)) {
        return await res.send({
            status: false,
            message: '404 (find not file)',
        });
    }
    if (!_name && !date && !nameFile) {
        return await res.send({
            status: false,
            message: 'no filename specified',
        });
    }
    await axios.put(process.env.URL_BASE + `/api/file-info/${_nameFile}`, {});
    let sentPath = {
        name: pathFile,
    };
    let outputPath = `images/webp/${nameFile}.webp`;
    width && (outputPath = `images/webp/${nameFile}__width_${width}.webp`);
    if (show || !TYPE_IMAGE.includes(typeFile)) {
        return res.sendFile(pathFile);
    } else if (!fs.existsSync(path.resolve(outputPath))) {
        return await resize(pathFile, 'webp', Number(width)).pipe(res);
    } else {
        const worker = new Worker(path.resolve('./src/utils/function/resizeImage.js'), {
            workerData: { pathFile: pathFile, width: Number(width), format: 'webp', name: nameFile },
        });

        let onSent = false;
        await worker.once('message', async (result) => {
            sentPath.name = await path.resolve('./' + result);
            return await res.sendFile(sentPath.name);
        });

        await worker.on('error', (error) => {
            onSent = true;
            console.log('error', error); // MongLV log fix bug
        });

        await worker.on('exit', (exitCode) => {
            !!onSent && resize(pathFile, 'webp', Number(width)).pipe(res);
        });
    }
};

module.exports = {
    sentFile,
    getFile,
};

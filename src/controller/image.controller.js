/**
 * Copyright 2020 present, Lê Văn Mong.
 * All rights reserved.
 * @author Mong Le Van on 8/18/2020
 * @email: levanmong.dola.99@gmail.com
 * @student-code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */

'use strict'

const db = require('../database/db');
function generateUUID() {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

module.exports = {
    get: (req, res) => {
        res.json(db.get('file').value())
    },
    detail: (req, res) => {
        const id = req.params.id;
        const file = db.get('file').find({ id: id }).value();
        res.json(file);
    },
    update: (req, res) => {
        db.get('file').find({ fileName: req.params.name }).assign({ visit_timestamps: new Date().getTime() }).value();
        res.json({message: 'Insert success!'});
    },
    store: (req, res) => {
        const obj = {
            "id": generateUUID(),
            "folder": req.body.folder,
            "fileName": req.body.fileName,
            "size": req.body.size,
            "url":  req.body.url || "",
            "timestamps": new Date().getTime(),
            "visit_timestamps": new Date().getTime(),
        };
        db.get('file').push(obj).write();
        res.json({message: 'Post Insert success!'})
    },
    remove: (req, res) => {
        // const arr = db.get('file').value().filter(obj => obj.id !== req.params.id);
        res.json({message: 'Insert success!'})
    }
}

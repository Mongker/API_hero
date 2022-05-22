/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 16/05/2022
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */


// model
const Thread = require('../model/thread.model');

const POST = async (req, res) => {
    console.log('req', req); // MongLV log fix bug
    console.log('req.body', req.body); // MongLV log fix bug
    await Thread(req.body)
        .save()
        .then((data) => {
            return res.json({ message: 'SUCCESS', data: data });
        })
        .catch((err) => {
            return res.status(500).json({ message: err });
        });
};

const UPDATE = async (req, res) => {
    await Thread.findById(req.params.id, function (err, Thread) {
        if (!Thread) res.status(404).send('data is not found');
        else {
            // Kiểm tra version vì mỗi loại version sẽ update khác nhau
            console.log('Thread.version', Thread.version); // MongLV log fix bug
            switch (Thread.version) {
                case 1:
                    // Code tiếp
                    break;
                default:
                    req.body.title && (Thread.title = req.body.title);
                    req.body.image_link && (Thread.image_link = req.body.image_link);
                    req.body.description && (Thread.description = req.body.description);
                    req.body.link_blank && (Thread.link_blank = req.body.link_blank);
                    req.body.date && (Thread.date = req.body.date);
                    req.body.groupId && (Thread.groupId = req.body.groupId);
                    break;
                }
            Thread.save()
                .then((business) => {
                    return res.json({ message: 'SUCCESS', data: business });
                })
                .catch((err) => {
                    return res.status(400).send({ message: err });
                });
        }
    });
};

const DELETE = async (req, res) => {
    await Thread.findByIdAndRemove({ _id: req.params.id }, async function (err, data) {
        if (err) res.json(err);
        else return res.status(200).send({ message: 'SUCCESS' });
    });
}

const GET = async (req, res) => {
    const groupId = req.query.groupId || '';
    await Thread.find({ groupId: groupId },function (err, data) {
        if (err) return res.status(404).json({ message: err });
        else return res.status(200).json(data);
    })
};

module.exports = {
    GET,
    POST,
    DELETE,
    UPDATE,
}

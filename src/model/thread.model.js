/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 16/05/2022
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Thread = new Schema(
    {
        groupId: {
            type: String,
            require: true,
            default: '',
        },
        title: {
            type: String,
            require: true,
            default: '',
        },
        type: {
            type: String,
            require: true,
            default: '',
        },
        image_link: {
            type: String,
            require: true,
            default: '',
        },
        version: {
            type: Number,
            require: true,
            default: 0,
        },
        description: {
            type: String,
            default: '',
        },
        link_blank: {
            type: String,
            default: '',
        },
        date: {
            type: String,
            default: '',
        },
    },
    {
        collection: 'thread',
    },
);
module.exports = mongoose.model('Thread', Thread, 'thread');

/**
 * Copyright 2020 present, Đào Thị Thanh Mai.
 * All rights reserved.
 * @author Mongker on 18/03/2022
 * @email: monglv36@gmail.com
 * @student_code: 68DCHT20091
 * @university: UTT (Đại học Công Nghệ Giao Thông Vận Tải)
 */
const path = require('path');
let getResourcesAssets = async (req, res) => {
    const fileName = req.params.name;
    const folder = req.params.folder;
    if (!fileName) {
        return res.send({
            status: false,
            message: 'no filename specified',
        });
    }
    res.sendFile(path.resolve(`./src/views/apecmandalakimboi.apecgroup.net/assets/${folder}/${fileName}`));
};
let getCDN = async (req, res) => {
    const fileName = req.params.name;
    if (!fileName) {
        return res.send({
            status: false,
            message: 'no filename specified',
        });
    }
    res.sendFile(path.resolve(`./src/views/cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/${fileName}`));
};
export default {
    getResourcesAssets,
    getCDN,
};

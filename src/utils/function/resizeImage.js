const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { parentPort, workerData } =  require('worker_threads');
async function resizeImage() {
    if(!workerData) return;
    const pathFile = workerData.pathFile && workerData.pathFile;
    const format = workerData.format && workerData.format;
    const width = workerData.width && workerData.width;
    const name = workerData.name && workerData.name;
    if(typeof pathFile !== 'string') {
        return null;
    } else {
        let outputPath  = `images/webp/${name}.webp`;
        width && (outputPath  = `images/webp/${name}__width_${width}.webp`);
        const pathWebP = path.resolve('./' + outputPath);
        if (fs.existsSync(path.resolve(pathWebP))) {
            return parentPort.postMessage(outputPath);
        } else {
            let transform = sharp(pathFile);
            if (format) {
                transform = transform.toFormat(format);
            }
            if (width) {
                console.log('width', typeof width); // MongLV log fix bug
                transform = transform.resize({width: width, fit: 'cover'});
                console.log(outputPath)
            }

            transform.toFile(outputPath);

            //readStream.pipe(transform)
            return parentPort.postMessage(outputPath);
        }

    }

}
resizeImage();
// module.exports = resizeImage;

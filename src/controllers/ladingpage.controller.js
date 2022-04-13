const { clientGoogleSheet } = require('./googlesheet.controller');

let getClientSettingGoogleSheet = async (req, res) => {
    let doc = await clientGoogleSheet();
    let sheet = doc.sheetsById[1915536628]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    let rows = await sheet.getRows(); // can pass in { limit, offset }
    const items = {};
    await rows.map((item) => {
        const itemIdsValue = item._rawData;
        items[itemIdsValue[0]] = itemIdsValue[1]
        return item;
    });

    return res.render('index.html', {locals: items});
};
let postSuccess = async (req, res) => {
    return res.render('thank-you');
};
module.exports = {
    getClientSettingGoogleSheet,
    postSuccess,
};

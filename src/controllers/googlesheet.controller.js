const moment = require('moment');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const axios = require('axios');

const PRIVATE_KEY =
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwrlJQy9GyIhL7\nie+yJG3ty9u3+KoRuj7xS35pYCnpPDGBa7xEi5jyW7KYj+p1uP0+utlvlrv/Zd5V\nXr56fWiOL8fbKwKhkqD9DuSZptC+PtNr5+hiHc7yfWMowN+fXrZrsw0H2N4OgYaX\ndHDKcFWJxUcd5shlDmWq/Mc4VjQzlRlr7/o2xmsrWgnFhyP5ojaI8DRi4xUrnPWM\nz86D77AgdnbXXGOKM+PuqNsNFdvNIFV6IEj/PwSL1Ug9Sjq/Fo0Um1NKKqvK1ASR\n1rXPXvMABfMBsoFjcybjOQfKPxqCCDTYv07YWkEsWflD46t6evKGJUw+rsN1xgVM\ngWcpIho9AgMBAAECggEAUTRV1hfPsfFSSzVLK1PuCIkVW/mY5Rv2eP3LRJBzwuSt\nFkBXoCOPMPkvXUpsJx5WmwHTFSQxFQITjaZFotPH/e39DAE5LNzRTG4PaIWQ1JfY\noXRNzObJao9xx1Xakgu8iUSavRwSd5VVsH/OpWS7E97NwHMFcNkMpmmXARAx3vCo\nQNvhARXj72E6HkI4bGzwSl4daKbKRwZXB5Np25RjmnllxiQzZu7PauUlaZEaooFs\nP8FuFIwSzS1NusrOWqYTyfi/9Jw+63UX+rKNDtI18otqc0dU0HVWbES6JUM6/igf\nBWk9YYiZP87hUgVWCVGMp5JFS0o70O1vtEgsOtKsGwKBgQDs/7OMmj0lc+E+uwkv\n1BPcgokIdDmYsLDbbg7XNsaj5rlPvTWuT6fc4mOAgFNyuWC7GfehwfGkcuUouxMt\nPTMscwMOW8MwaRX/6sZtfW/MsOKAuneec0q2ujbOQ/nG9sToiGNveHxYA/WJLRG3\n/gtHz3mWM9Pea9AV2e2Rx63FwwKBgQC+2J8eY5/IEhpWEyddf3v2YZNufT8iveFF\nC2tSsuLPqdgB17PiC+yk+iwEDfoMABgfDPYf1+4e8DkZi7zfA7N/1rz48ZTDj7RK\nrUnuxbiY2vWg+U9B8NUT2kPWSGQqrqN91SGEO+u9h4cvP136jTZaywJgKzs+9uvE\n/3XzhJKf/wKBgCnk9ZdYOJDjUCDnrTMQOUaUqKae7QOJ0GmppePzYd/dTErFNrUO\njazlNBOmG5o/HNNWPskQYKfiS5IMp9IqbF5iIlsqa3GmUeZAWT1HnDjB1/hLfhO7\na6yrdD64E3JRcvNsEK/Gy6w/XusV1XkB5nqWOXcMyFocEteaA33un1BDAoGAGz94\ncHFO5dTX18RCUZIbE9FYqGTPd9leaWo494S852NbiN/QOgzzy5ZAZI/OTJpS11QV\na/R7dgVcUa5m1/yCS1VQg8aSM923oxXcwW+PbJuOiF4wF70X3w7Bsr2BN6rZguTE\nNUoM3XGVNoS4mUZCJXJos2xYuCOvA+Bpacxa1ucCgYEA2Ihkt9qh1dn9RS068GXG\nPqZF11T+ytJs7atPY6KuvDnpjKjjVH/Kd8BL9vwS02E929QESF0mCk3TsFqZ1Cvx\n/qeYoOFtMTDOy0TwyrpCJqoa1Zj1K+aEERQ/qU0JQjsCqQwohukh0soDlZgp/+X/\nfxJVBf6/qvVBHgpCmYdL4mc=\n-----END PRIVATE KEY-----\n';
const CLIENT_EMAIL = 'googlesheet@solid-feat-344315.iam.gserviceaccount.com';
const SHEET_ID = '15xvPWknE76tGaR__uOV0OMGxCnzsNJJp1mwITvo6JfY';
// const x = {
//     "type": "service_account",
//     "project_id": "solid-feat-344315",
//     "private_key_id": "20138bc2cb733c288eb212e2a5dae9220124c368",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwrlJQy9GyIhL7\nie+yJG3ty9u3+KoRuj7xS35pYCnpPDGBa7xEi5jyW7KYj+p1uP0+utlvlrv/Zd5V\nXr56fWiOL8fbKwKhkqD9DuSZptC+PtNr5+hiHc7yfWMowN+fXrZrsw0H2N4OgYaX\ndHDKcFWJxUcd5shlDmWq/Mc4VjQzlRlr7/o2xmsrWgnFhyP5ojaI8DRi4xUrnPWM\nz86D77AgdnbXXGOKM+PuqNsNFdvNIFV6IEj/PwSL1Ug9Sjq/Fo0Um1NKKqvK1ASR\n1rXPXvMABfMBsoFjcybjOQfKPxqCCDTYv07YWkEsWflD46t6evKGJUw+rsN1xgVM\ngWcpIho9AgMBAAECggEAUTRV1hfPsfFSSzVLK1PuCIkVW/mY5Rv2eP3LRJBzwuSt\nFkBXoCOPMPkvXUpsJx5WmwHTFSQxFQITjaZFotPH/e39DAE5LNzRTG4PaIWQ1JfY\noXRNzObJao9xx1Xakgu8iUSavRwSd5VVsH/OpWS7E97NwHMFcNkMpmmXARAx3vCo\nQNvhARXj72E6HkI4bGzwSl4daKbKRwZXB5Np25RjmnllxiQzZu7PauUlaZEaooFs\nP8FuFIwSzS1NusrOWqYTyfi/9Jw+63UX+rKNDtI18otqc0dU0HVWbES6JUM6/igf\nBWk9YYiZP87hUgVWCVGMp5JFS0o70O1vtEgsOtKsGwKBgQDs/7OMmj0lc+E+uwkv\n1BPcgokIdDmYsLDbbg7XNsaj5rlPvTWuT6fc4mOAgFNyuWC7GfehwfGkcuUouxMt\nPTMscwMOW8MwaRX/6sZtfW/MsOKAuneec0q2ujbOQ/nG9sToiGNveHxYA/WJLRG3\n/gtHz3mWM9Pea9AV2e2Rx63FwwKBgQC+2J8eY5/IEhpWEyddf3v2YZNufT8iveFF\nC2tSsuLPqdgB17PiC+yk+iwEDfoMABgfDPYf1+4e8DkZi7zfA7N/1rz48ZTDj7RK\nrUnuxbiY2vWg+U9B8NUT2kPWSGQqrqN91SGEO+u9h4cvP136jTZaywJgKzs+9uvE\n/3XzhJKf/wKBgCnk9ZdYOJDjUCDnrTMQOUaUqKae7QOJ0GmppePzYd/dTErFNrUO\njazlNBOmG5o/HNNWPskQYKfiS5IMp9IqbF5iIlsqa3GmUeZAWT1HnDjB1/hLfhO7\na6yrdD64E3JRcvNsEK/Gy6w/XusV1XkB5nqWOXcMyFocEteaA33un1BDAoGAGz94\ncHFO5dTX18RCUZIbE9FYqGTPd9leaWo494S852NbiN/QOgzzy5ZAZI/OTJpS11QV\na/R7dgVcUa5m1/yCS1VQg8aSM923oxXcwW+PbJuOiF4wF70X3w7Bsr2BN6rZguTE\nNUoM3XGVNoS4mUZCJXJos2xYuCOvA+Bpacxa1ucCgYEA2Ihkt9qh1dn9RS068GXG\nPqZF11T+ytJs7atPY6KuvDnpjKjjVH/Kd8BL9vwS02E929QESF0mCk3TsFqZ1Cvx\n/qeYoOFtMTDOy0TwyrpCJqoa1Zj1K+aEERQ/qU0JQjsCqQwohukh0soDlZgp/+X/\nfxJVBf6/qvVBHgpCmYdL4mc=\n-----END PRIVATE KEY-----\n",
//     "client_email": "googlesheet@solid-feat-344315.iam.gserviceaccount.com",
//     "client_id": "110342192090051671822",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/googlesheet%40solid-feat-344315.iam.gserviceaccount.com"
// }

const clientGoogleSheet = async () => {
    const doc = new GoogleSpreadsheet(SHEET_ID);
    // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
    });
    await doc.loadInfo(); // loads document properties and worksheets
    return doc;
};
/**
 * getClientGoogleSheet: Dùng để lấy danh sách khách hàng đã summit
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
let getClientGoogleSheet = async (req, res) => {
    const id = req.params.id || 0;
    console.log('id', id); // MongLV log fix bug
    let doc = await clientGoogleSheet();
    let sheet = doc.sheetsById[Number(id)]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    let rows = await sheet.getRows(); // can pass in { limit, offset }
    const items = {};

    if (id !== 0) {
        await rows.map((item) => {
            const itemIdsValue = item._rawData;
            items[itemIdsValue[0]] = itemIdsValue[1];
            return item;
        });
    } else {
        await rows.map((item) => {
            const itemIdsKey = item._sheet.headerValues;
            const itemIdsValue = item._rawData;
            items[itemIdsValue[2]] = {
                [itemIdsKey[0]]: itemIdsValue[0],
                [itemIdsKey[1]]: itemIdsValue[1],
                [itemIdsKey[2]]: itemIdsValue[2],
                [itemIdsKey[3]]: itemIdsValue[3],
                [itemIdsKey[4]]: itemIdsValue[4],
            };
            return item;
        });
    }

    return await res.json(items);
};

/**
 * addClientGoogleSheet: Dùng để thêm khách hàng vào cơ sở dữ liệu (google sheet)
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
let addClientGoogleSheet = async (req, res) => {
    try {
        let currentDate = new Date();
        const { NAME, PHONE } = req.body;
        console.log('req', req); // MongLV log fix bug

        const format = 'HH:mm DD/MM/YYYY';

        let formatedDate = moment(currentDate).format(format);

        // Initialize the sheet - doc ID is the long id in the sheets URL
        const doc = await clientGoogleSheet();

        // const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
        const sheet = doc.sheetsById[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
        // const sheet1 = doc.sheetsById[1915536628]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

        const email = 'levanmong.dola.99@gmail.com, hand@apec.com.vn, lehongphuc.apec@gmail.com, monglv@bkav.com, monglv.bkav@gmail.com';
        await sheet.addRow({
            NAME: NAME,
            PHONE: `'${PHONE}`,
            TIME: formatedDate,
        });

        await axios.post('http://103.57.222.215:4040/' + 'api/sent-mail', {
            to: email,
            subject: '[THÔNG BÁO] Có khách hàng mới',
            data: {
                NAME,
                PHONE,
            },
        });
        await res.json({ message: 'ok' });
    } catch (e) {
        return res.json({ message: e });
    }
};

module.exports = {
    getClientGoogleSheet: getClientGoogleSheet,
    addClientGoogleSheet: addClientGoogleSheet,
    clientGoogleSheet: clientGoogleSheet,
};

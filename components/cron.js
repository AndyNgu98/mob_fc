var axios = require('axios');
var mysql = require('mysql');
var config = require('../config');

let pool = mysql.createPool(config.keys.db);

const media = {
    auth: {
        USER_ID: config.keys.auth.user_Id,
        APP_ID: config.keys.auth.app_Id,
        APP_SECRET: config.keys.auth.app_Secret 
    },
    url: {
        ROOT: config.keys.auth.root_Url
    }
}

let i = `SELECT access_token FROM config`; 
// only middleware being run through app.js 
exports.cronJob = () => {
    pool.getConnection((err, connection) => {
        pool.query(`SELECT access_token FROM config WHERE tokenId =1`, (err, res) => {
            //passing token into the placeholder
            mediaCheck(res[0].access_token) 
            refreshToken(res[0].access_token)
        })
    })
}


function mediaCheck(token) {
    axios.get(`${media.url.ROOT}/${media.auth.USER_ID}/media`, {
        params: {
            access_token: token,
            fields: 'media_type,media_url,permalink,thumbnail_url,timestamp'
        }
    })
    .then(response => {
        pool.query(`DELETE FROM instagram`, (err, res) => {
            const mediaArray = response.data.data.filter(obj => obj.media_type === 'IMAGE')
            mediaUpdate(mediaArray)
        })
    })
    .catch(error => {
        console.log(error)
    })
} 

function mediaUpdate(array) {
    array.slice(0, 5).forEach(obj => {
        pool.query(`INSERT INTO instagram SET ID =? media_type =?, media_url =?,  permalink =?, thumbnail_url =?`, 
        [ obj.id, obj.media_type, obj.media_url, obj.permalink, obj.thumbnail_url ], (error, response) => {
            console.log(response)
        })
    })
}

function refreshToken(token) {
    axios.get(`https://graph.instagram.com/refresh_access_token`, {
    params: {
        access_token: token,
        grant_type: 'ig_refresh_token'
    }
    })
    .then(response => { 
        const refreshToken = response.data.access_token;
        pool.query(`UPDATE config SET access_token = ? WHERE tokenId = 1`, refreshToken, (err, response) => {
            console.log(response);
        })
    })
    .catch(error => {
        console.log(error)
    })
}


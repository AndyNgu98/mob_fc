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
        // console.log(obj.media_type)
        console.log(obj.media_url)
        // console.log(obj.permalink)
        pool.query(`INSERT INTO instagram SET media_url = https://scontent-lht6-1.cdninstagram.com/v/t51.29350-15/121965805_364610904733733_7996473189419180647_n.jpg?_nc_cat=100&ccb=2&_nc_sid=8ae9d6&_nc_ohc=pUI0N_D-3rIAX_dyS_y&_nc_ht=scontent-lht6-1.cdninstagram.com&oh=818461ca38f59f95ec3366d3f531faed&oe=5FDE9AEC`, 
        (error, response) => {
            console.log(response)
            console.log('static insert')
        })
        pool.query(`INSERT INTO instagram SET media_url =?`, 
        [obj.media_url], (error, response) => {
            console.log(response)
            console.log('media insert')
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


var express = require('express');
var axios = require('axios');
var mysql   = require('mysql');
var config = require('../../config');
var router = express.Router();

let pool = mysql.createPool(config.keys.db);

const media = {
    auth: {
        USER_ID: config.keys.auth.user_Id,
        APP_ID: config.keys.auth.app_Id,
        APP_SECRET: config.keys.auth.app_Secret,
        
    },
    url: {
        ROOT: config.keys.auth.root_Url,
    }
}

// -------- THIS IS THE WEEKLY REFRESH OF THE INSTAGRAM MEDIA ------------

const day = ((1000 * 60) * 60 ) * 24

setInterval(function(){
    //  FUNCTION THAT REFRESHES AND SELECTS TOKEN THEN REFRESHES MEDIA AND UPDATE INTO DATABASE 
    
}, 25000);



// RUNNING ALL FUNCTIONS
function retrieveId() {
    pool.getConnection((err, connection ) => {
        pool.query(`SELECT access_token FROM config WHERE ID=?`, `instagram`, (err, res) => {
            // REFRESH MEDIA FUNCTION(res[0].access_token)
            mediaCheck(res[0].access_token)
            refreshToken(res[0].access_token)
            
        })
    })
}

// ----------- THIS IS REFRESH TOKEN AND UPDATE INTO DATABASE --------------

// REFRESH TOKEN
function refreshToken(accessToken) {
    axios.get(`https://graph.instagram.com/refresh_access_token`, {
        params: {
            access_token: accessToken,
            grant_type: 'ig_refresh_token'
        }
    })
    .then(response => { 
        // UPDATE TOKEN INTO DB
        pool.getConnection((err, connection) => {
            const instaToken = response.data.access_token
            pool.query(`UPDATE config SET access_token =? WHERE ID =?`, [instaToken,`instagram`], (error, response) => {
                console.log(response) 
            })
        });
    })
    .catch(error => {
        console.log(error)
    })
} 

// ------ THIS IS RETRIEVE MEDIA INFORMATION AND UPDATE TO DATABASE --------------

// REFRESH MEDIA FUNCTION

function mediaCheck(mediaToken) {
    axios.get(`${media.url.ROOT}/${media.auth.USER_ID}/media`, {
        params: {
            access_token: mediaToken,
            fields: 'media_type,media_url,permalink,thumbnail_url,timestamp'
        }
    })
    .then(response => {
      
        pool.getConnection((err, connection ) => {
            pool.query(`DELETE FROM instagram;`,(error, res ) =>  {
                const mediaArray = response.data.data.filter(obj => obj.media_type === 'IMAGE')
                console.log(mediaArray)
                mediaArray.slice(0, 5).forEach(obj => {
                    pool.query(`INSERT INTO instagram SET media_type =?, media_url =?,  permalink =?, thumbnail_url =?`, 
                    [obj.media_type, obj.media_url, obj.permalink, obj.thumbnail_url ], (error, response) => {
                        console.log(response)
                    })
                }) 
                
            })
        })
    })
    .catch(error => {
        console.log(error)
    })
}


// ---------------- GET EXISITNG TOKEN AND REFRESHES IT SAVING INTO DB AND UPDATES MEDIA INTO DB ---------------------- 
function getCurrenttoken() {
    pool.getConnection((err, connection) => {
        connection.query(`SELECT access_token FROM config WHERE instagramID = 1`, (error, token) => {
            refreshToken(token)
        })
        if(err) {
            console.log(err);
        } else {
            mediaCheck()
        }
    });
}

router.get('/', function(req, res, next) {

});

module.exports = router;








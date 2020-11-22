var express = require('express');
var axios = require('axios');
var mysql   = require('mysql');
var cron = require('node-cron');
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
let i = `SELECT access_token FROM config`; 

    cron.schedule('0 0 0 * * *', () => {
    })

router.get('/', function(req, res, next) {
    retrieveId();

    // RUNNING ALL FUNCTIONS
    function retrieveId() {
        pool.getConnection((err, connection ) => {
            pool.query(`SELECT access_token FROM config WHERE tokenId =1`, (err, res) => {
                mediaCheck(res[0].access_token)
                refreshToken(res[0].access_token)
            })
        })
    }
    // UPDATE TOKEN
    function refreshToken() {
        pool.query(i, (error,insertTokres) => {
            axios.get(`https://graph.instagram.com/refresh_access_token`, {
            params: {
                access_token: insertTokres[0].access_token,
                grant_type: 'ig_refresh_token'
            }
            })
            .then(response => { 
                pool.getConnection((err, connection) => {
                    let datatok = response.data.access_token;
                    let sql = `UPDATE config SET access_token = ? WHERE tokenId = 1`;
                    pool.query(sql, datatok, (err, response) => {
                        console.log(response);
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
            }) 
        } 


        function mediaCheck() {
            pool.query(i, (error,mediaTokres) => {
            axios.get(`${media.url.ROOT}/${media.auth.USER_ID}/media`, {
                params: {
                    access_token: mediaTokres[0].access_token,
                    fields: 'media_type,media_url,permalink,thumbnail_url,timestamp'
                }
            })
            .then(response => {
                pool.getConnection((err, connection ) => {
                    pool.query(`DELETE FROM instagram;`,(error, res ) =>  {
                        const mediaArray = response.data.data.filter(obj => obj.media_type === 'IMAGE')
                        console.log(mediaArray.slice(0,5))
                        // mediaArray.slice(0, 5).forEach(obj => {
                        //     pool.query(`INSERT INTO instagram SET media_type =?, media_url =?,  permalink =?, thumbnail_url =?`, 
                        //     [obj.media_type, obj.media_url, obj.permalink, obj.thumbnail_url ], (error, response) => {
                        //         console.log(response)
                        //     })
                        // })      
                    })
                })
            })
            .catch(error => {
                console.log(error)
            }) 
            })  
        }




        // UPDATE MEDIA DB
    // function mediaCheck() {
    //     pool.query(i, (error,mediaTokres) => {
    //     axios.get(`${media.url.ROOT}/${media.auth.USER_ID}/media`, {
    //         params: {
    //             access_token: mediaTokres[0].access_token,
    //             fields: 'media_type,media_url,permalink,thumbnail_url,timestamp'
    //         }
    //     })
    //     .then(response => {
    //         pool.getConnection((err, connection ) => {
    //             pool.query(`DELETE FROM instagram;`,(error, res ) =>  {
    //                 const mediaArray = response.data.data.filter(obj => obj.media_type === 'IMAGE')
    //                 mediaArray.slice(0, 5).forEach(obj => {
    //                     pool.query(`INSERT INTO instagram SET media_type =?, media_url =?,  permalink =?, thumbnail_url =?`, 
    //                     [obj.media_type, obj.media_url, obj.permalink, obj.thumbnail_url ], (error, response) => {
    //                         console.log(response)
    //                     })
    //                 })      
    //             })
    //         })
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     }) 
    //     })  
    // }

    res.json({
        message: `hello world`,
    })
})

module.exports = router;








var express = require('express');
var axios = require('axios');
var router = express.Router();

router.get('/', function(req, res, next) {

    const config = {
        auth: {
            USER_ID:17841405467967246,
            APP_ID:1506350809754664,
            APP_SECRET:'5124259dcd55f7cfd208233635e9b005',
            TOKEN:'IGQVJXZAHdrVVBxRmY1RW02ZAHVfTzg1a1J6Ulhsal9wWHRadUZApRXNnU285M0ZAGWG9pck5IVGx2RUFYVW42REVIVmNwMzduVWpjUmxOV2VjLW8zYWpVd3BWNzIyOE1MVWR4blJxTnVB'
        },
        url: {
            ROOT: 'https://graph.instagram.com',
        }
    }

    axios.get(`${config.url.ROOT}/${config.auth.USER_ID}/media`, {
        params: {
            access_token: config.auth.TOKEN,
            fields: 'caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username'
        }
    })
    .then(response => { 
        res.json(response.data.data);
    })
    .catch(error => {
        console.log(error)
    })

});

module.exports = router;










 

require('dotenv').config()

const keys = {
    db: {
       connectionLimit: 10,
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASS,
       database: process.env.DATABASE

    },
    auth: {
        user_Id: process.env.USER_ID,
        app_Id: process.env.APP_ID,
        App_Secret: process.env.APP_SECRET,
        root_Url: process.env.ROOT_URL
    }
}

module.exports = {
    keys
}
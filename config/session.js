const MongoStore = require('connect-mongo');
module.exports =  {secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,  // change to false — only save when session has data
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
        ttl: 14 * 24 * 60 * 60  // 14 days in seconds
    })
}
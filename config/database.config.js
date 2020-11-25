const dbConfig = {
    host: 'mongodb+srv://',
    userName: 'user01',
    password: 'qwe123',
    database: 'VDF'
}

var connectionStr = `mongodb+srv://${dbConfig.userName}:${dbConfig.password}@cluster0.fbfmi.mongodb.net/${dbConfig.database}?authSource=admin&replicaSet=atlas-auobh6-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`

module.exports = {
    url: connectionStr
}
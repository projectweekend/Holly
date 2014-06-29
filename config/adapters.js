module.exports.adapters = {
    'default': 'mongo',
    mongo: {
        module: 'sails-mongo',
        host: process.env.DB_1_PORT_27017_TCP_ADDR || process.env.MONGO_HOST,
        port: 27017,
        database: process.env.MONGO_DATABASE
    }
};

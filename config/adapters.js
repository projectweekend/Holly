module.exports.adapters = {
    'default': 'mongo',

    mongo: {
        module: 'sails-mongo',
        host: process.env.MONGO_HOST,
        port: 27017,
        database: process.env.MONGO_DATABASE
    }
};

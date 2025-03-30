module.exports = {
    env: 'production',
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h'
    }
};
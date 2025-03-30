module.exports = {
    env: 'development',
    port: 3000,
    database: {
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'password',
        database: 'dynamic_website'
    },
    jwt: {
        secret: 'development-secret',
        expiresIn: '1h'
    }
};
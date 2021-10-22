
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": process.env.DB_NAME,
    "host": process.env.DB_SERVER,
    "dialect": "mysql",
    "dialectOptions": { "decimalNumbers": true }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

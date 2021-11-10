module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "hrfTBiPg1234",
    DB: "testingBD",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
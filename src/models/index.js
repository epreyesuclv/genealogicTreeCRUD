const dbConfig = require("../database_config/mysql.config");

const { Sequelize } = require("sequelize");

const sequelize = (function () {
  try {
    const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
      host: dbConfig.HOST,
      dialect: dbConfig.dialect,
      operatorsAliases: false,
    
      pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
      }
    });
    return sequelize;
  } catch (err) {
    console.log(err);
  }
})();

module.exports = {
  sequelize,
};

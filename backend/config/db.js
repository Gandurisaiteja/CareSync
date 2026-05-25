const { Sequelize } = require("sequelize");

const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",

  storage:
    process.env.NODE_ENV === "production"
      ? "/opt/render/project/src/database/clinic.sqlite"
      : path.join(
          __dirname,
          "../database/clinic.sqlite"
        ),

  logging: false,
});

module.exports = sequelize;
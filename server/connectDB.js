const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  host: "localhost",
  dialect: "mysql",
  username: "root",
  password: "123456",
  database: "fullstack",
  port: 3306,
  logging: false,
});

let connection_database = async () => {
  try {
    await sequelize.authenticate();
    console.log("Ket noi database thanh cong.");
  } catch (error) {
    console.error("Khong the ket noi database", error);
  }
};

module.exports = connection_database;

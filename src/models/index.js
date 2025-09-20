import sequelize from "../db.js";
import { User } from "./user.js";
import { Transaction } from "./transaction.js";
import { applyRelations } from "./relations.js";

applyRelations();

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully.");
    await sequelize.sync({ alter: true });
    console.log("Database synced.");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

export { sequelize, User, Transaction, initDB };

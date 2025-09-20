// models/User.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import bcrypt from "bcrypt";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email already been used",
      },
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Username already been used",
      },
      validate: {
        is: {
          args: /^[a-zA-Z0-9_]{3,16}$/,
          msg: "Username must be 3-16 characters long and contain only alphanumeric characters or underscores.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@()!%*?&])[A-Za-z\d@()!%*?&]{8,50}$/,
          msg: "Password must be 8+ characters long and include at least: one lowercase letter, one uppercase letter, one number, one special character (@ ( ) ! % * ? &)",
        },
      },
    },
  },
  {
    tableName: "users",
  }
);

const hashPassword = async (user) => {
  if (user.changed("password") && user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
};

User.addHook("beforeCreate", hashPassword);
User.addHook("beforeUpdate", hashPassword);

export { User };

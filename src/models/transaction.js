import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    amount: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    category: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: { msg: "Category must not be empty." },
            isIn: {
                args: [["income", "expense"]],
                msg: "Category must be either 'income' or 'expense'."
            }
        }
    }
},
    {
        tableName: 'transactions',
    });
export {Transaction}

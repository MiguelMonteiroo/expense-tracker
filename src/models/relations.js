import { User } from "./user.js";
import { Transaction } from "./transaction.js";

const applyRelations = () => {
  User.hasMany(Transaction, {
    foreignKey: "userId",
    as: 'transactions',
    onDelete: "CASCADE",
  });

  Transaction.belongsTo(User, {
    foreignKey: "userId",
    as:'user'
  });
};

export { applyRelations };

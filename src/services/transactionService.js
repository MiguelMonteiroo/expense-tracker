import { Transaction } from '../models/index.js';

async function getAllTransactions(userId, category){
    const where = {userId}
    if(category){
        where.category = category;
    }
    const transactions = await Transaction.findAll({where});  
    return transactions;
}

async function getTransactionById(id, userId){
    const transaction = await Transaction.findOne({where: {id: id, userId: userId}});
      if(!transaction){
        return null;
    }
    return result;
}

async function createTransaction(transacationInfo){
    return await Transaction.create(transacationInfo);
}

async function updateTransaction(id, transactionInfo){
    const transaction = await Transaction.findOne({where: {id: id, userId: transactionInfo.userId}});
    if(!transaction){
        return null;
    }
    return await transaction.update(transactionInfo)
    
}


async function deleteTransaction(id){
    const transaction = await Transaction.findOne({where: {id: id, userId: userId}});
    if(!transaction){
        return false;
    }
    await transaction.destroy();
    return true;
}

export {createTransaction, getAllTransactions, getTransactionById, updateTransaction, deleteTransaction}
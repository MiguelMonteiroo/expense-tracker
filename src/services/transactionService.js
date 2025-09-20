import { Transaction } from '../models/index.js';
import { TransactionDTO } from './dtos/transactionDTO.js';

async function getAllTransactions(userId, category){
    const where = {userId}
    if(category){
        where.category = category;
    }

    let transactions = await Transaction.findAll({where});  
    transactions = transactions.map( x => new TransactionDTO(x));

    return transactions;
}

async function getTransactionById(id, userId){
    const transaction = await Transaction.findOne({where: {id: id, userId: userId}});
      if(!transaction){
        return null;
    }
    return new TransactionDTO(transaction);
}

async function createTransaction(transacationInfo){
    const transaction = await Transaction.create(transacationInfo)
    return new TransactionDTO(transaction);;
}

async function updateTransaction(id, transactionInfo){
    const transaction = await Transaction.findOne({where: {id: id, userId: transactionInfo.userId}});
    if(!transaction){
        return null;
    }
    const updatedTransaction = await transaction.update(transactionInfo)
    return new TransactionDTO(updatedTransaction);
    
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
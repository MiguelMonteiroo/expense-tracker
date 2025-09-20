export class TransactionDTO{
    constructor(transaction){
        this.id = transaction.id;
        this.amount = transaction.amount;
        this.category = transaction.category;
        this.createdAt = transaction.createdAt;
    }
}
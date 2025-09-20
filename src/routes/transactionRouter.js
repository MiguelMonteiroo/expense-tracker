import express from 'express';
import { checkAuthentication } from '../helpers/checkAuthentication.js'
const router = express.Router();

import { createTransaction, getAllTransactions, getTransactionById, updateTransaction, deleteTransaction } from '../services/transactionService.js'



router.post('/', checkAuthentication, async (req, res, next) => {
    try {
        if (req.body.userId) {
            res.status(400).send('Invalid Request')
        }
        const transacationInfo = { userId: req.session.user.id, ...req.body }
        const transaction = await createTransaction(transacationInfo);
        res.status(201).json(transaction);
    }
    catch (error) {
        next(error)
    }
})



router.get('/', checkAuthentication, async (req, res, next) => {
    try {
        const category = req.query.category;
        const transactions = await getAllTransactions(req.session.user.id, category);
        res.status(200).json(transactions);
    }
    catch (error) {
        next(error)
    }
})


router.get('/:id', checkAuthentication, async (req, res, next) => {
    try {
        const transaction = await getTransactionById(req.params.id, req.session.user.id);
        if (!transaction) {
            res.status(404).send('Transaction not found')
        }
        res.status(200).json(transaction);
    }
    catch (error) {
        next(error)
    }
})


router.put('/:id', checkAuthentication, async (req, res, next) => {
    try {
        if (req.body.userId) {
            res.status(400).send('Invalid Request')
        }
        const transacationInfo = { userId: req.session.user.id, ...req.body }
        const transaction = await updateTransaction(req.params.id, transacationInfo);
        if (!transaction) {
            res.status(404).send('Transaction not found')
        }
        res.status(200).json(transaction);
    }
    catch (error) {
        next(error)
    }
})



router.delete('/:id', checkAuthentication, async (req, res, next) => {
    try {
        const deleted = await deleteTransaction(parseInt(req.params.id, req.session.user.id));
        if (!deleted) {
            res.status(404).send('Transaction not found')
        }
        res.status(200).send();
    }
    catch (error) {
        next(error)
    }
})



export default router;
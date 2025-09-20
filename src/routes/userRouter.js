import express from 'express'
import { checkAuthentication } from '../helpers/checkAuthentication.js';
import { registerUserAsync, getUserByIdAsync, deleteUserAsync, updateUserAsync } from '../services/userService.js'
const router = express.Router();

router.get('/:id', checkAuthentication, async (req, res, next) => {
    try {
        if (req.params.id != req.session.user.id) {
            res.status(401).send('You cannot access this resource');
        }
        const user = await getUserByIdAsync(req.params.id);
        if (!user) {
            res.status(404).send('User not Found');
        }
        res.status(200).json(user);

    } catch (error) {
        next(error)
    }
})
router.post('', async (req, res, next) => {
    try {
        const user = await registerUserAsync(req.body);
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
})
router.put('/:id', checkAuthentication, async (req, res, next) => {
    try {
        if ((req.params.id != req.session.user.id)) {
            res.status(401).send('You cannot access this resource');
        }
        const user = await updateUserAsync(req.params.id, req.body);
        if (!user) {
            res.status(404).send('User not Found');
        }
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
})
router.delete('/:id', checkAuthentication, async (req, res, next) => {
    try {
        if ((req.params.id != req.session.user.id)) {
            res.status(401).send('You cannot access this resource');
        }
        const deleted = await deleteUserAsync(req.params.id);
        if (!deleted) {
            res.status(404).send('User not Found');
        }
        res.status(200).send();
    } catch (error) {
        next(error)
    }
})

export default router
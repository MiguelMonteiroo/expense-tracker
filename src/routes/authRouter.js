import express from 'express'
const router = express.Router();

import { login } from '../services/authService.js';

router.post('/login', async (req, res, next) => {
    try {
        const user = await login(req.body);
        req.session.regenerate(error => {
            if (error) {
                res.status(500).send('Error regerating session')
            }
            req.session.user = user
            res.status(200).send(`Logged in as ${user.username}`)

        })
    } catch (error) {
        next(error)
    }

})


router.post('/logout', async (req, res) => {
    req.session.destroy(error =>{
        if(error){
            res.status(500).send('An error ocurred while trying to logout');
        }
        res.clearCookie('connect.sid', {path:'/'});
        res.status(200).send('User logged out.');
    })

})


export default router;
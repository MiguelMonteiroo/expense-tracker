export function checkAuthentication(req, res, next) {
    if(!req.session.user){
        res.status(401).send('Not logged in')    
    }
    next();
}
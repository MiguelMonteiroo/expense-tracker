import { Sequelize } from 'sequelize';
import { HttpError } from './httpError.js';

export default (error, req, res, next) =>{
    console.log(error);
    
  if(error instanceof Sequelize.UniqueConstraintError){
        return res.status(400).json({
            error:{
                message: 'Unique constraint error',
                details: error.errors.map(e => e.message)
            }
        });
    }

    if(error instanceof Sequelize.ValidationError){
        return res.status(400).json({
            error:{
                message: 'Validation error',
                details: error.errors.map(e => e.message)
            }
        });
    }

    if(error instanceof HttpError){
        return res.status(error.statusCode).json({
            error:{
                message: error.message
            }
        });
    }

    res.status(500).send("Something went wrong");
}
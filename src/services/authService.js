import {User} from '../models/index.js'
import bcrypt from 'bcrypt';
import { HttpError } from '../helpers/httpError.js';
import { UserDTO } from './dtos/userDTO.js';

async function login(user) {
    const email = user.email;
    const password = user.password;

    if(!email || !password){
        throw new HttpError('User and password are required', 400);
    }
    const persistedUser = await User.findOne({where: {email: email}, raw:true});

    const passwordMatch = await bcrypt.compare(password, persistedUser?.password || '');
    if(!persistedUser || !passwordMatch){
        throw new HttpError('Incorrect email or password.', 401);
    }

    return new UserDTO(persistedUser);
    
}

export {login}
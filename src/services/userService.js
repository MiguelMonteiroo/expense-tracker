import { User } from "../models/index.js";
import { UserDTO } from "./dtos/userDTO.js";

async function registerUserAsync(userData) {
    const user = await User.create(userData); 
    return new UserDTO(user);
}

async function getUserByIdAsync(id) {
    const user = await User.findByPk(id)
     if (!user) {
        return null
    } 
    return new UserDTO(user);
}

async function deleteUserAsync(id) {
    const user  = await User.findByPk(id);
    if (!user) {
        return false
    }
    await user.destroy();
    return true
}

async function updateUserAsync(id, userData) {
    const user  = await User.findByPk(id);
    if (!user) {
        return null
    }
    await user.update({userData});
    return  new UserDTO(user);

}

export {registerUserAsync, getUserByIdAsync, deleteUserAsync, updateUserAsync}
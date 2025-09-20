import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

(async () => {
    try{
        await db.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch (error){
        console.log('Unable to connect to database.', error);
    }
})();

export default sequelize;
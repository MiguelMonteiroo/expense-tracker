import express from 'express';
import session from 'express-session';
import { initDB } from "./src/models/index.js";
import transactionRouter from './src/routes/transactionRouter.js';
import userRouter from './src/routes/userRouter.js';
import authRouter from './src/routes/authRouter.js'
import globalErrorMiddleware from './src/helpers/globalErrorMiddleware.js'

const app = express();
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}))
app.use(express.json())
app.use('/api/transactions', transactionRouter)
app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)


app.use(globalErrorMiddleware)

const start = async () => {
  await initDB();
  app.listen(3000, () => console.log("Server running on http://localhost:3000"));
};

start();
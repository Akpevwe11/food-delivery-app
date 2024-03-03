import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { readFileSync } from 'fs';
import admin from 'firebase-admin'
import debug from 'debug';
const serviceAccount = JSON.parse(readFileSync('./service-account.json', 'utf-8'))



const app = express()
const port = process.env.PORT || 3000

dotenv.config()


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Db connected')).catch((err) => console.log(err))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', authRouter)
app.use('/api/users', userRouter)



app.listen(process.env.PORT || port, () =>  console.log(`Server Listening on port ${port}...`))
   

import express from 'express';
import { PORT, MONGODB_URL } from './config.js';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
    return res.status(200).send('Welcome to MERN stack tutorial');
})

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})
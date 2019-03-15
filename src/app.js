import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import userRouter from './routes/userRoute';
import mongoose from './config/connection';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('uploads')));
app.use('/api/v1', userRouter);

export default app;

import mongoose from 'mongoose';
import config from './config';
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true }, ()=>{
    console.log("mongodb successfully connected!")
})
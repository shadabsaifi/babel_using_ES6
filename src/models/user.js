import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import common from '../common/commonFunction';
var Schema = mongoose.Schema;
var userSchema = new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String
    },
    profilePic:{
        type:String
    },
    password:{
        type:String
    }
})


userSchema.plugin(mongoosePaginate);
var userModel = mongoose.model('user', userSchema, 'user');
export default userModel;


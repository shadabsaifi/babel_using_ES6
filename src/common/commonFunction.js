import jwt from 'jsonwebtoken';
import config from '../config/config';
import bcrypt from 'bcrypt';
import multer  from 'multer'
import path from 'path';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', '..', '/uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
   
var upload = multer({ storage: storage })


const response = (res, responseCode, responseMessage, result)=>{
    
    return res.status(responseCode).json({
        responseCode,
        responseMessage,
        result
    })
}

const createToken = (data)=>{
    return new Promise((resolve, reject)=>{            
        jwt.sign(data, config.PRIVATE_KEY, { expiresIn: 60 * 60 }, (err, token)=>{
            if(err)
                reject(err)
            else
                resolve(token)
        })
    })
}

const verifyToken = (token)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(token, config.PRIVATE_KEY, (err, decode)=>{
            if(err)
                reject(err)
            else
                resolve(decode)
        })
    })
}

const createHash = (myPlaintextPassword)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.hash(myPlaintextPassword, config.saltRounds, function(err, hash) {
            if(err)
                reject(err)
            else
                resolve(hash)
          });
    })
}

const compareHash = (myPlaintextPassword, hash)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
            if(err)
                reject(err)
            else
                resolve(res)
        });
    })
}

const generateOTP = ()=>{
    return Math.floor(100000 + Math.random() * 900000);
}

const uploadProfilePic = (req, res, next)=>{
    upload.single('profilePic')(req, res, next);
}

export default {
    response,
    createToken,
    verifyToken,
    createHash,
    compareHash,
    generateOTP,
    uploadProfilePic
}
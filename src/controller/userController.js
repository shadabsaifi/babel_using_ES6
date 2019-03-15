import User from '../models/user';
import common from '../common/commonFunction';
import message from '../common/message';
import code from '../common/code';


const verifyToken = (req, res, next)=>{
    let { accesstoken } = req.headers;
    console.log("accesstoken====>>>",accesstoken)
    common.verifyToken(accesstoken)
    .then(decode=>{
    let { _id, email } = decode;
        User.findById(_id).lean()
        .then(user=>{
            req['user'] = user;
            next();
        }, err=>{
            return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)
        })
    }, err=>{
        return common.response(res, code.UNAUTHORIZED, message.INVALID_TOKEN)
    })
}

const createUser = (req, res)=>{

    User.create(req.body)
    .then(result=>{
        let { _id, email, firstName, lastName } = result;
        let data = { _id, email }
        common.createToken(data)
        .then(token=>{
          let finalData = { _id, email, firstName, lastName, token };
            return common.response(res, code.EVERY_THING_IS_OK, message.USER_CREATED, finalData);
        }, err=>{
            return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR, err)
        })
    }, err=>{
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR, err)
    })

}

const getUserDetail = (req, res)=>{
  let { userId } = req.params;
  User.findById(userId, { password:0 })
  .then(user=>{
      return common.response(res, code.EVERY_THING_IS_OK, message.SUCCESS, user);
  }, err=>{
      return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)
  })
}

const getByIdUser = (req, res)=>{
  let { userId } = req.params;
    User.findById(userId, { password:0 })
    .then(user=>{
        return common.response(res, code.EVERY_THING_IS_OK, message.SUCCESS, user);
    }, err=>{
        return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)
    })
}

const getAllUser = (req, res)=>{
  let { page, limit } = req.query;
  let options =  { page:Number(page) || 1, limit:Number(limit) || 10 };
  User.paginate({}, options)
  .then(result=>{
      return common.response(res, code.EVERY_THING_IS_OK, message.SUCCESS, result);
  }, err=>{
      return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR)
  })  
}

const updateUser = (req, res)=>{
  let { userId } = req.params;
  if( req.file &&  req.file.filename) 
      req.body['profilePic'] = req.file.filename;
  User.findByIdAndUpdate(userId, req.body, { new:true })
  .then(result=>{
      return common.response(res, code.EVERY_THING_IS_OK, message.USER_UPDATED, result);
  }, err=>{
      return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR, err)
  })

}

const deleteUser = (req, res)=>{
  let { userId } = req.params;
  User.remove({_id:userId})
  .then(result=>{
      return common.response(res, code.EVERY_THING_IS_OK, message.USER_DELETED);
  }, err=>{
      return common.response(res, code.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR, err)
  })
}

export default {
    
  verifyToken,
  createUser,
  getUserDetail,
  getByIdUser,
  getAllUser,
  updateUser,
  deleteUser
}
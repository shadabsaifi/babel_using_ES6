import express from 'express';
import userController from '../controller/userController';
import common from '../common/commonFunction';
var userRouter = express.Router();
 

userRouter.route('/users')
    .post(userController.createUser)



userRouter.route('*').all(userController.verifyToken);

userRouter.route('/users').get(userController.getAllUser);
userRouter.route('/users/:userId')
    .get(userController.getUserDetail)
    .put(common.uploadProfilePic, userController.updateUser)
    .delete(userController.deleteUser);


export default userRouter;

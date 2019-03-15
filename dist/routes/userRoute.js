"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controller/userController"));

var _commonFunction = _interopRequireDefault(require("../common/commonFunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = _express.default.Router();

userRouter.route('/users').post(_userController.default.createUser);
userRouter.route('*').all(_userController.default.verifyToken);
userRouter.route('/users').get(_userController.default.getAllUser);
userRouter.route('/users/:userId').get(_userController.default.getUserDetail).put(_commonFunction.default.uploadProfilePic, _userController.default.updateUser).delete(_userController.default.deleteUser);
var _default = userRouter;
exports.default = _default;
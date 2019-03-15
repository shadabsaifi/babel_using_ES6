"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongoosePaginate = _interopRequireDefault(require("mongoose-paginate"));

var _commonFunction = _interopRequireDefault(require("../common/commonFunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose.default.Schema;
var userSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  profilePic: {
    type: String
  },
  password: {
    type: String
  }
});
userSchema.plugin(_mongoosePaginate.default);

var userModel = _mongoose.default.model('user', userSchema, 'user');

var _default = userModel;
exports.default = _default;
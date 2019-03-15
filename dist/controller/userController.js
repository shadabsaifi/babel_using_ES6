"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _commonFunction = _interopRequireDefault(require("../common/commonFunction"));

var _message = _interopRequireDefault(require("../common/message"));

var _code = _interopRequireDefault(require("../common/code"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifyToken = function verifyToken(req, res, next) {
  console.log("req.path====>>>", req.path);
  var accesstoken = req.headers.accesstoken;
  console.log("accesstoken====>>>", accesstoken);

  _commonFunction.default.verifyToken(accesstoken).then(function (decode) {
    var _id = decode._id,
        email = decode.email;

    _user.default.findById(_id).lean().then(function (user) {
      req['user'] = user;
      next();
    }, function (err) {
      return _commonFunction.default.response(res, _code.default.INTERNAL_SERVER_ERROR, _message.default.INTERNAL_SERVER_ERROR);
    });
  }, function (err) {
    return _commonFunction.default.response(res, _code.default.UNAUTHORIZED, _message.default.INVALID_TOKEN);
  });
};

var createUser = function createUser(req, res) {
  _user.default.create(req.body).then(function (result) {
    var _id = result._id,
        email = result.email,
        firstName = result.firstName,
        lastName = result.lastName;
    var data = {
      _id: _id,
      email: email
    };

    _commonFunction.default.createToken(data).then(function (token) {
      var finalData = {
        _id: _id,
        email: email,
        firstName: firstName,
        lastName: lastName,
        token: token
      };
      return _commonFunction.default.response(res, _code.default.EVERY_THING_IS_OK, _message.default.USER_CREATED, finalData);
    }, function (err) {
      return _commonFunction.default.response(res, _code.default.INTERNAL_SERVER_ERROR, _message.default.INTERNAL_SERVER_ERROR, err);
    });
  }, function (err) {
    return _commonFunction.default.response(res, _code.default.INTERNAL_SERVER_ERROR, _message.default.INTERNAL_SERVER_ERROR, err);
  });
};

var getUserDetail = function getUserDetail(req, res) {
  var userId = req.params.userId;

  _user.default.findById(userId, {
    password: 0
  }).then(function (user) {
    return _commonFunction.default.response(res, _code.default.EVERY_THING_IS_OK, _message.default.SUCCESS, user);
  }, function (err) {
    return _commonFunction.default.response(res, _code.default.INTERNAL_SERVER_ERROR, _message.default.INTERNAL_SERVER_ERROR);
  });
};

var getByIdUser = function getByIdUser(req, res) {
  var userId = req.params.userId;

  _user.default.findById(userId, {
    password: 0
  }).then(function (user) {
    return _commonFunction.default.response(res, _code.default.EVERY_THING_IS_OK, _message.default.SUCCESS, user);
  }, function (err) {
    return _commonFunction.default.response(res, _code.default.INTERNAL_SERVER_ERROR, _message.default.INTERNAL_SERVER_ERROR);
  });
};

var getAllUser = function getAllUser(req, res) {
  var _req$query = req.query,
      page = _req$query.page,
      limit = _req$query.limit;
  var options = {
    page: Number(page) || 1,
    limit: Number(limit) || 10
  };

  _user.default.paginate({}, options).then(function (result) {
    return _commonFunction.default.response(res, _code.default.EVERY_THING_IS_OK, _message.default.SUCCESS, result);
  }, function (err) {
    return _commonFunction.default.response(res, _code.default.INTERNAL_SERVER_ERROR, _message.default.INTERNAL_SERVER_ERROR);
  });
};

var updateUser = function updateUser(req, res) {
  var userId = req.params.userId;
  if (req.file && req.file.filename) req.body['profilePic'] = req.file.filename;

  _user.default.findByIdAndUpdate(userId, req.body, {
    new: true
  }).then(function (result) {
    return _commonFunction.default.response(res, _code.default.EVERY_THING_IS_OK, _message.default.USER_UPDATED, result);
  }, function (err) {
    return _commonFunction.default.response(res, _code.default.INTERNAL_SERVER_ERROR, _message.default.INTERNAL_SERVER_ERROR, err);
  });
};

var deleteUser = function deleteUser(req, res) {
  var userId = req.params.userId;

  _user.default.remove({
    _id: userId
  }).then(function (result) {
    return _commonFunction.default.response(res, _code.default.EVERY_THING_IS_OK, _message.default.USER_DELETED);
  }, function (err) {
    return _commonFunction.default.response(res, _code.default.INTERNAL_SERVER_ERROR, _message.default.INTERNAL_SERVER_ERROR, err);
  });
};

var _default = {
  verifyToken: verifyToken,
  createUser: createUser,
  getUserDetail: getUserDetail,
  getByIdUser: getByIdUser,
  getAllUser: getAllUser,
  updateUser: updateUser,
  deleteUser: deleteUser
};
exports.default = _default;
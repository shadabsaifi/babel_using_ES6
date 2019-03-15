"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config/config"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer.default.diskStorage({
  destination: function destination(req, file, cb) {
    console.log("file===>>>", file);
    console.log("path===>>>", _path.default.join(__dirname, '..', '..', '/uploads'));
    cb(null, _path.default.join(__dirname, '..', '..', '/uploads'));
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

var upload = (0, _multer.default)({
  storage: storage
});

var response = function response(res, responseCode, responseMessage, result) {
  return res.status(responseCode).json({
    responseCode: responseCode,
    responseMessage: responseMessage,
    result: result
  });
};

var createToken = function createToken(data) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken.default.sign(data, _config.default.PRIVATE_KEY, {
      expiresIn: 60 * 60
    }, function (err, token) {
      if (err) reject(err);else resolve(token);
    });
  });
};

var verifyToken = function verifyToken(token) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken.default.verify(token, _config.default.PRIVATE_KEY, function (err, decode) {
      if (err) reject(err);else resolve(decode);
    });
  });
};

var createHash = function createHash(myPlaintextPassword) {
  return new Promise(function (resolve, reject) {
    _bcrypt.default.hash(myPlaintextPassword, _config.default.saltRounds, function (err, hash) {
      if (err) reject(err);else resolve(hash);
    });
  });
};

var compareHash = function compareHash(myPlaintextPassword, hash) {
  return new Promise(function (resolve, reject) {
    _bcrypt.default.compare(myPlaintextPassword, hash, function (err, res) {
      if (err) reject(err);else resolve(res);
    });
  });
};

var generateOTP = function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
};

var uploadProfilePic = function uploadProfilePic(req, res, next) {
  upload.single('profilePic')(req, res, next);
};

var _default = {
  response: response,
  createToken: createToken,
  verifyToken: verifyToken,
  createHash: createHash,
  compareHash: compareHash,
  generateOTP: generateOTP,
  uploadProfilePic: uploadProfilePic
};
exports.default = _default;
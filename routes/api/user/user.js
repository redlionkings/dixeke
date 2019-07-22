const { User } = require("../../../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const validateRegisterInput = require("../../../validation/validateRegister");

const register = async (req, res, next) => {
  const { email, password, fullName, userType, phone, DOB } = req.body;
  const { isValid, error } = await validateRegisterInput(req.body);
  if (!isValid) return res.status(404).json(error);
  const newUser = new User({
    email,
    password,
    fullName,
    userType,
    phone,
    DOB
  });
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(400).json(err);
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return res.status(400).json(err);
      newUser.password = hash;
      newUser.save()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
    });
  });
};
const login = (req, res, next) => {
  const { email, password, fingerprint } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) return Promise.reject({ errors: "user does not exit" });
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch) return res.status(400).json(err);
        const payload = {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          userType: user.userType
        };
        const KEY = process.env.SECRET_KEY + fingerprint;
        jwt.sign(payload, KEY, { expiresIn: "1h" }, (err, token) => {
          if (err) return res.status(400).json(err);
          return res.status(200).json({ message: "login success", token });
        });
      });
    })
    .catch(err => res.status(400).json(err));
};

const testPrivate = (req, res, next) => {
  res.status(200).json({ message: "no auth" });
};

const uploadAvatar = (req, res, next) => {
  const { id } = req.user;
  User.findById(id)
    .then(user => {
      if (!user) return Promise.reject({ error: "upload error" });
      user.avatar = req.file.path;
      return user.save();
    })
    .then(user => res.status(200).json(user))
    .catch(user => res.status(400).json(user));
};

const getUserById = (req, res, next) => {
  const { id } = req.user;
  User.findById(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err));
};

module.exports = { login, register, testPrivate, uploadAvatar, getUserById };

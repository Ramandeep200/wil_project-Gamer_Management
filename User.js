const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { verifyToken } = require("../auth/auth");
const bcrypt = require("bcrypt");

// @route   POST api/users
// @desc    Create a user
// @access  Public
router.post("/register", (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  let email = newUser.email;
  try {
    //if user is already registered
    User.findOne({ email: email })
      .then(async (user) => {
        if (user) {
          res.status(400).json({
            message: "User already registered",
          });
        } else {
          let user = await User.register(newUser);
          console.log("user", user);
          const token = user.generateAuthToken();
          res.status(200).json({
            token,
            user,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: err.message,
        });
      });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// @route   POST api/users/login
// @desc    Login a user
// @access  Public
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    //use the login method to login a user
    const user = await User.login(email, password);
    if (user) {
      //generate a token for the user
      const token = user.generateAuthToken();
      //send the token to the user
      res.status(200).json({
        token,
        user,
      });
    } else {
      res.status(400).json({
        error: "Invalid credentials",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



//get user by token
router.get("/get", verifyToken, (req, res) => {
  User.findById(req.userId)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ message: err.message }));
});

module.exports = router;

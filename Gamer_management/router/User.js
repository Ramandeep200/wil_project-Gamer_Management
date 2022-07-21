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

// @route   PUT api/users/:id
// @desc    Update a user by id
// @access  Public
router.patch("/update", verifyToken, async (req, res) => {
  console.log("update", req.body);
  const id = req.userId;
  const userData = req.body;
  if (req.body.password) {
    userData.password = bcrypt.hashSync(req.body.password, 10);
  }

  try {
    const user = await User.findByIdAndUpdate(id, userData, {
      new: true,
    });
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// @route   DELETE api/users/:id
// @desc    Delete a user
// @access  Public
router.delete("/delete/:id", verifyToken, (req, res) => {
  User.findById(req.params.id)
    .then((user) => user.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

router.delete("/delete", verifyToken, (req, res) => {
  User.findById(req.userId)
    .then((user) => user.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

//get user by token
router.get("/get", verifyToken, (req, res) => {
  User.findById(req.userId)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ message: err.message }));
});

//request to be a host
router.post("/requestHost", verifyToken, (req, res) => {
  console.log("requestHost", req.headers);
  User.findById(req.userId)
    .then((user) => {
      user.requestHost.is_request = true;
      user.requestHost.user_id = req.userId;
      user.requestHost.firstName = user.firstName;
      user.requestHost.lastName = user.lastName;
      user.requestHost.request_status = "Pending";

      user.save().then((user) => {
        res.json(user);
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

module.exports = router;

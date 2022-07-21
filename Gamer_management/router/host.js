const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { verifyHost } = require("../auth/auth");

//get all users
router.get("/getall", verifyHost, (req, res) => {
  console.log("get all users by host");
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ message: err.message }));
});


// Update a user by id
router.put("/update/:id", verifyHost, (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ message: err.message }));
});

module.exports = router;

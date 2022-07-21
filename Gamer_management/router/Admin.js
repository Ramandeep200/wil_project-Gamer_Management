const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const Department = require("../models/departments");
const { verifyAdmin, verifyToken } = require("../auth/auth");

//add a new user
router.post("/add", verifyAdmin, (req, res) => {
  const newUser = req.body;
  console.log("new user ---- ---- ",newUser);
  try {
    //if user is already registered
    User.findOne({ email: newUser.email })
      .then(async (user) => {
        if (user) {
          res.status(400).json({
            message: "User already registered",
          });
        } else {
          let user = await User.register(newUser);
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

//get all users
router.get("/getall", verifyToken, (req, res) => {
  console.log("get all users");
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json({ message: err.message }));
});

//get a user by id
router.get("/get/:id", verifyAdmin, (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ message: err.message }));
});

// Update a user by id
router.put("/update/:id", verifyAdmin, (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ message: err.message }));
});

//get all user requests
router.get("/getallrequests", verifyAdmin, (req, res) => {
  User.find({})
    .then((users) => {
      let requests = [];
      users.forEach((user) => {
        if (user.requestHost.is_request === true) {
          requests.push(user.requestHost);
        }
      });

      res.json(requests);
    })
    .catch((err) => res.status(400).json({ message: err.message }));
});

//accept a user request
router.patch("/accept/:id", verifyAdmin, (req, res) => {
  let user = User.findById(req.params.id);
  user
    .then((user) => {
      user.Role = "Host";
      user.requestHost.request_status = "Accepted";
      user.save();
      res.json(user);
    })
    .catch((err) => res.status(400).json({ message: err.message }));
});

//reject a user request
router.patch("/reject/:id", verifyAdmin, (req, res) => {
  let user = User.findById(req.params.id);
  user
    .then((user) => {
      user.requestHost.request_status = "Rejected";
      user.save();
      res.json(user);
    })
    .catch((err) => res.status(400).json({ message: err.message }));
});

//delete a user
router.delete("/delete/:id", verifyAdmin, (req, res) => {
  console.log("delete user");
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ message: err.message }));

  


});

//create a new department
router.post("/department", verifyAdmin, (req, res) => {
  try {
    const newDepartment = req.body;
    Department.create(newDepartment)
      .then((department) => res.json(department))
      .catch((err) => res.status(400).json({ message: err.message }));
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//get all departments
router.get("/getalldepartments", verifyAdmin, (req, res) => {
  Department.find()
    .then((departments) => res.json(departments))
    .catch((err) => res.status(400).json({ message: err.message }));
});

//get a department by id
router.get("/getdepartment/:id", verifyAdmin, (req, res) => {
  Department.findById(req.params.id)
    .then((department) => res.json(department))
    .catch((err) => res.status(400).json({ message: err.message }));
});

//update a department by id
router.put("/updatedepartment/:id", verifyAdmin, (req, res) => {
  Department.findByIdAndUpdate(req.params.id, req.body)
    .then((department) => res.json(department))
    .catch((err) => res.status(400).json({ message: err.message }));
});

//delete a department
router.delete("/deletedepartment/:id", verifyAdmin, (req, res) => {
  Department.findById(req.params.id)
    .then((department) => department.remove())
    .then(() => res.json({ message: "Department deleted successfully" }))
    .catch((err) => res.status(400).json({ message: err.message }));
});

//add a user to a department
router.put("/adddepartment/:id", verifyAdmin, (req, res) => {
  Department.findByIdAndUpdate(req.params.id, {
    $push: { users: req.body.user },
  })
    .then((department) => res.json(department))
    .catch((err) => res.status(400).json({ message: err.message }));
});

//remove a user from a department
router.put("/removedepartment/:id", verifyAdmin, (req, res) => {
  Department.findByIdAndUpdate(req.params.id, {
    $pull: { users: req.body.user },
  })
    .then((department) => res.json(department))
    .catch((err) => res.status(400).json({ message: err.message }));
});

module.exports = router;

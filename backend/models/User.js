const mongooes = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongooes.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    //date of birth
    dob: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },

    Role: {
      type: String,
      required: true,
      enum: ["Admin", "User", "Host"],
      default: "User",
    },
    requestHost: {
      is_request: {
        type: Boolean,
        default: false,
      },

      user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      request_status: {
        type: String,
        required: true,
        enum: ["Pending", "Accepted", "Rejected", "Cancelled", "Not Sent"],
        default: "Not Sent",
      },
    },
  },
  {
    timestamps: true,
  }
);

//rgister user in the database and return the user
UserSchema.statics.register = async function (userData) {
  const User = mongooes.model("User");
  // hash the password
  const hash = bcrypt.hashSync(userData.password, 10);
  userData.password = hash;
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    return error;
  }
};

// login user and return the user
UserSchema.statics.login = function (email, password) {
  const User = mongooes.model("User");
  return User.findOne({ email }).then((user) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    } else {
      return null;
    }
  });
};

//generateAuthToken generate a token for the user
UserSchema.methods.generateAuthToken = function () {
  const user = this;
  //use the user id and IsAdmin to generate a token
  const token = jwt.sign({ _id: user._id, Role: user.Role }, "test");
  return token;
};

//forgot password
UserSchema.statics.forgotPassword = function (email) {
  const User = mongooes.model("User");
  return User.findOne({ email }).then((user) => {
    if (user) {
      //generate new password
      const newPassword = req.body.newPassword;
      //hash the password
      const hash = bcrypt.hashSync(newPassword, 10);
      //update the password
      user.password = hash;
      return user.save();
    } else {
      return false;
    }
  });
};

const User = mongooes.model("User", UserSchema);
module.exports = { User };

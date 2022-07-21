const express = require("express");
const mongooes = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const ip = require("ip");

dotenv.config();

let host = ip.address();

const port = process.env.PORT || 5200;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongooes
  .connect("mongodb://localhost:27017/Gamer_Management", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err))
  .finally(() => {
    app.listen(port,host, () => {
      console.log(`Server running on ${host}:${port}`);
    });
  });
  
  //gamer_management route
    app.get("/", (req, res) => {    
        res.send("Hello World");
    }
    );

app.use("/api/users", require("./router/User"));
app.use("/api/host", require("./router/host"));
app.use("/api/admin", require("./router/Admin"));

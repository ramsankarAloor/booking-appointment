const express = require("express");

const sequelize = require("./util/database");
const cors = require('cors');

const userBooking = require("./models/user-booking");
const UserBooking = require("./models/user-booking");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  const bookings = await UserBooking.findAll();
  res.send(bookings);
});

app.post("/new-booking", async (req, res) => {
  try {
    if(!req.body.phone){
        throw new Error('Phone number is mandatory!');
    }
    if(req.body.phone.length !== 10){
        throw new Error('Enter valid phone number');
    }
    if(!req.body.email){
        throw new Error('email is mandatory!');
    }
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;

    const data = await UserBooking.create({
      name: name,
      email: email,
      phone: phone,
    });

    res.status(201).json({ newBooking: data });

  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

app.use("/", (req, res, next) => {
  res.status(404).send("<h1>Page not found</h1>");
});

sequelize
  .sync()
  .then((result) => app.listen(5000))
  .catch((err) => console.log(err));

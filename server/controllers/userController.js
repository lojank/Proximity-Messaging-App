const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
   
    const { latitude, longitude } = req.body; // Get latitude and longitude from the query params

    if (!latitude || !longitude) {
      return res.status(400).json({ msg: 'Latitude and longitude are required', status: false });
    }

    const centerPoint = {
      type: 'Point',
      coordinates: [parseFloat(latitude), parseFloat(longitude)]
    };

    const users = await User.find({
      _id: { $ne: req.params.id }, // Exclude the current user if needed
      location: { $exists: true }, // Check if the location field exists
  $and: [
    {
      location: {
        $geoWithin: {
          $centerSphere: [centerPoint.coordinates, 100 / 6378.1] // Earth's radius in kilometers
        }
      }
    }
  ]
    }).select([
      "email",
      "username",
      "_id",
      "location"
    ]);

    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};


module.exports.updateLocation = async (req, res, next) => {
  try {
    const { _id, latitude, longitude } = req.body;
    const centerPoint = {
      type: 'Point',
      coordinates: [parseFloat(latitude), parseFloat(longitude)] 
    };

    const location = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(_id) }, // Use _id directly as an ObjectId
      { $set: { location: centerPoint } }, // Use $set to update the location field
      { new: true, upsert: true }
    );

    if (location) {
      res.json({ location, status: true });
    } else {
      res.json({ msg: 'User not found', status: false });
    }
  } catch (error) {
    // Extract the error message and send it in the response
    res.json({ msg: error.message, status: false });
  }
};

module.exports.logOut = async (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    const location = await User.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params.id) }, // Use _id directly as an ObjectId
      { $unset: { location: 1 } }
    )
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

const {
  login,
  register,
  getAllUsers,
  updateLocation,
  logOut,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.post("/allusers/:id", getAllUsers);
router.get("/logout/:id", logOut);
router.post("/updateLocation", updateLocation)

module.exports = router;

const { Router } = require('express');
const express = require('express');
const { addUser, getAllUsers, getUsers, deleteUser, updateUser } = require('../controller/user');
const router = express.Router();


router.route("/users").post(addUser);
router.route("/users").get(getAllUsers);
router.route("/users/:id").get(getUsers);
router.route("/users/:id").put(updateUser);
router.route("/users/:id").delete(deleteUser);

module.exports = router;

const express = require('express');

const router = express.Router()

const userController = require('../controllers/userController')


router.get('/', userController.view);
router.post("/", userController.find);
router.post("/adduser", userController.form);
router.get("/adduser", userController.create);
router.get("/:id", userController.delete);
router.get("/edituser/:id", userController.edit);
router.post("/edituser/:id", userController.edited);

module.exports = router;
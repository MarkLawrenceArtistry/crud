const express = require('express');
const router = express.Router();
const logger = require('../middlewares/logger')

const userController = require('../controllers/userControlller')

router.post('/', logger.logTimer, userController.createUser)
router.put('/:id', logger.logTimer, userController.updateUser)
router.get('/:id', logger.logTimer, userController.getUser)
router.delete('/:id', logger.logTimer, userController.deleteUser)
router.get('/', logger.logTimer, userController.getAllUsers)
// router.get('/', logger.logTimer, userController.getAllUsersViaEach)


module.exports = router
const express = require('express');
const router = express.Router();

const HomeController = require('../Controllers/HomeController');


router.get('/', HomeController.index);
router.get('/userlist', HomeController.getAllUsers);
router.post('/createuser', HomeController.createNewUser);
router.get('/getuser/:id', HomeController.findUserById);
// router.patch('/:id', HomeController.updateAUser);
// router.delete('/:id', HomeController.deleteAUser);

module.exports = router;
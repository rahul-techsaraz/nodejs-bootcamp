const express = require('express');
const {getAllUsers,createUser,getUserById,updateUserById,deleteUserById} = require('../controller/usersController');
const { signup } = require('../controller/authCOntroller');
const router = express.Router();

router.post('/signup',signup)

router.route('/')
    .get(getAllUsers)
  .post(createUser)
router.route('/:id')
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById)

module.exports = router;
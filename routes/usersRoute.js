const express = require('express');
const {getAllUsers,createUser,getUserById,updateUserById,deleteUserById} = require('../controller/usersController')
const router = express.Router();

router.route('/')
    .get(getAllUsers)
  .post(createUser)
router.route('/:id')
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById)

module.exports = router;
const express = require('express');
const {getAllUsers,createUser,getUserById,updateUserById,deleteUserById} = require('../controller/usersController');
const { signup,login,protectRoutes, forgotPassword, resetPassword } = require('../controller/authCOntroller');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);



router.route('/')
    .get(getAllUsers)
  .post(createUser)
router.route('/:id')
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById)

module.exports = router;
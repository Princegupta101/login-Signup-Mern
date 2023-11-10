const express =require('express');
const jwtAuth = require('../middleware/jwtAuth');
const authRouter= express.Router();
const {
     signUp ,
     signIn, 
     getUser,
      logout
    } = require('../controller/authController');

authRouter.post('/signin',signIn)
authRouter.post('/signup',signUp);

authRouter.get('/user', jwtAuth ,getUser)
authRouter.get('/logout', jwtAuth ,logout)

module.exports=authRouter;

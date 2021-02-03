const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const Logger = require('../util/logger');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtToken } = require('../config/default');
const auth = require('../middleware/auth');

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  POST /api/auth/
@desc    Login to account 
@access  Public
******************************************************************************/
router.post(
   '/',
   [
      check('email', 'Please enter a valid email').isEmail(),
      check('password', 'Please enter password').not().isEmpty(),
   ],
   async (req, res) => {
      const results = validationResult(req);
      if (!results.isEmpty()) {
         return res.status(400).json({ errors: results.array() });
      }

      try {
         const { email, password } = req.body;
         Logger.log(`${email} is trying to login`, __filename);
         let user = await Users.findOne({ email });
         if (!user) {
            return res.status(400).json({
               errors: { msg: 'Login infomation invalid, Please retry.' },
            });
         }
         const match = await bcrypt.compare(password, user.password);
         if (!match) {
            return res.status(400).json({
               errors: { msg: 'Login infomation invalid, Please retry.' },
            });
         }

         const payload = {
            user: {
               id: user.id,
            },
         };

         jwt.sign(
            payload,
            jwtToken,
            { expiresIn: '12h' },
            function (err, token) {
               if (err) Logger.log(`${err}`, __filename);
               Logger.log(`User logged in: ${email}`, __filename);
               res.json({ token });
            }
         );
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(400).json({ error: 'Server error' });
      }
   }
);

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  GET /api/auth/
@desc    get user
@access  Private
******************************************************************************/
router.get('/', auth, async (req, res) => {
   try {
      const user = await Users.findOne({ _id: req.user.id }).select(
         '-password'
      );
      Logger.log(`API get user Found: ${user.email}`, __filename);
      return res.json(user);
   } catch (error) {
      Logger.error(`Api error ${error.message}`, __filename);
      return res.status(401).json({ error: 'Server error' });
   }
});
module.exports = router;

const express = require("express");
const Users = require("../models/Users");
const router = express.Router();
const Logger = require("../util/logger");
const { validationResult, check } = require("express-validator");
const gravatar = require("gravatar");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const fs = require("fs");
const {
   jwtToken,
   AWS_ID,
   AWS_BUCKET_NAME,
   AWS_KEY,
} = require("../config/default");
// const userWall = require("../models/UserWall");
const AWS = require("aws-sdk");

router.post(
   "/",
   [
      // name must not be empty
      check("email", "Please enter your name ").not().isEmpty(),
      // username must be an email
      check("email", "Please enter a valid email").isEmail(),
      // password must be at least 6 chars long
      check("password", "Please enter a password or more characters").isLength({
         min: 6,
      }),
   ],
   async (req, res) => {
      try {
         const result = validationResult(req);
         if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
         }
         const { name, email, password } = req.body;
         let user = await Users.findOne({ email });
         if (user) {
            return res
               .status(500)
               .json({ errors: [{ msg: "User already exists" }] });
         }
         const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm",
         });
         user = new Users({
            name,
            email,
            avatar,
            password,
         });

         //encrpt the password
         const salt = await bcrypt.genSalt(10);
         user.password = await bcrypt.hash(password, salt);

         const newUser = await user.save();
         //create walls on created
         // const UserWall = new userWall({
         //    user: user.id,
         // });
         // await UserWall.save();
         const payload = {
            user: {
               id: user.id,
            },
         };

         jwt.sign(
            payload,
            jwtToken,
            { expiresIn: "1h" },
            function (err, token) {
               if (err) Logger.log(`${err}`, __filename);
               Logger.log(`User created: ${email}`, __filename);
               res.json({ token });
            }
         );
      } catch (err) {
         Logger.error(`Api error ${err.message}`, __filename);
         res.status(400).json({ errors: [{ msg: "Server error" }] });
      }
   }
);
router.put("/avatar/", [auth], async (req, res) => {
   try {
      const avatar = req.files["avatar"][0];
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) {
         fs.unlink(avatar.path);
         return res.status(400).json({ errors: { msg: "User not found" } });
      }

      const s3 = new AWS.S3({
         accessKeyId: AWS_ID,
         secretAccessKey: AWS_KEY,
      });
      // const name = path.parse(avatar).base;
      console.log(avatar);
      const params = {
         Bucket: AWS_BUCKET_NAME,
         Key: `${user._id}/${avatar.originalname}`,
         Body: fs.createReadStream(avatar.path),
      };
      s3.deleteObject(
         {
            Bucket: "django-rest-proj-files",
            Key: user.avatar,
         },
         function (err, data) {
            if (err) console.log(err, err.stack);
            // error
            else console.log("deleted"); // deleted
         }
      );
      s3.upload(params, function (err, data) {
         if (err) {
            throw err;
         }
         console.log(`File uploaded successfully. ${data.Location}`);
         user.avatar = data.Location;
         user.save();
         // fs.unlink(avatar.path);
         res.json(user);
      });
   } catch (error) {
      Logger.error(`Api error ${error.message}`, __filename);
      res.status(400).json({ errors: [{ msg: "Server error" }] });
   }
});
module.exports = router;

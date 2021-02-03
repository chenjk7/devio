const express = require("express");
const { validationResult, check } = require("express-validator");
const Profile = require("../models/Profile");
const Users = require("../models/Users");
const auth = require("../middleware/auth");
const Logger = require("../util/logger");
const router = express.Router();
const { CheckIdisValid, validationErrors } = require("../middleware/validator");
const { validationError, CheckInput } = require("../middleware/validator");
const userWall = require("../models/UserWall");
const Post = require("../models/Post");
const fs = require("fs");
const {
   jwtToken,
   AWS_ID,
   AWS_BUCKET_NAME,
   AWS_KEY,
} = require("../config/default");
const AWS = require("aws-sdk");
const { PaginationCnt } = require("../config/default");
/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  POST /api/profile
@desc    make a profile or update a profile
@access  Private
******************************************************************************/
router.post(
   "/",
   [
      auth,
      check("status", "Please fill in the status").not().isEmpty(),
      check("skills", "please fill in the skills").not().isEmpty(),
   ],
   async (req, res) => {
      const results = validationResult(req);
      if (!results.isEmpty()) {
         console.log(results.array());
         res.status(400).json({ errors: results.array() });
      }

      try {
         const user = await Users.findById(req.user.id).select("-password");
         Logger.log(
            `Attempting to create/update profile for: ${user.email}`,
            __filename
         );
         if (!user) {
            res.status(400).json([
               { msg: "User profile cannot be created for this user" },
            ]);
         }
         //get req body data
         const {
            status,
            skills,
            email,
            phone,
            homepage,
            github,
            company,
            bio,
            address,
            facebook,
            linkedin,
            instagram,
         } = req.body;
         const profileData = {};
         profileData.user = user.id;
         if (status) profileData.status = status;
         if (skills)
            profileData.skills = skills.split(",").map((skill) => skill.trim());
         profileData.contact = {};
         if (email) profileData.contact.email = email;
         if (phone) profileData.contact.phone = phone;
         if (homepage) profileData.homepage = homepage;
         if (company) profileData.company = company;
         if (github) profileData.github = github;
         if (bio) profileData.bio = bio;

         if (address) profileData.address = address;
         profileData.socialMedia = {};
         facebook ? (profileData.socialMedia.facebook = facebook) : "";
         linkedin ? (profileData.socialMedia.linkedin = linkedin) : "";
         instagram ? (profileData.socialMedia.instagram = instagram) : "";

         const profile = await Profile.findOne({ user: user.id });
         if (profile) {
            if (profile.cover) profileData.cover = profile.cover;
            const result = await Profile.findOneAndUpdate(
               { user: user.id },
               { $set: profileData },
               { new: true }
            );
            Logger.log(`Profile Updated for : ${user.email}`, __filename);
            return res.json(result);
         }
         //create user wall if not exist
         const MyUserWall = await userWall.findOne({ user: user.id });
         if (!MyUserWall) {
            const UserWall = new userWall({
               user: user.id,
            });
            await UserWall.save();
         }

         const newProfile = new Profile(profileData);
         await newProfile.save();
         Logger.log(`Profile created for : ${user.email}`, __filename);
         res.json(newProfile);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: "Server error" });
      }
   }
);

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  GET /api/profile
@desc    Get all users profile
@access  Public
******************************************************************************/
router.get("/", async (req, res) => {
   try {
      const allProfiles = await Profile.find().populate("user", [
         "name",
         "avatar",
         "date",
      ]);
      const pageCount = Math.ceil(allProfiles.length / PaginationCnt);
      let page = parseInt(req.query.p);
      if (!page) {
         page = 1;
      }
      if (page > pageCount) {
         // page=pageCount
         return res.status().json({ errors: [{ msg: "Invalid page" }] });
      }
      res.json({
         page: page,
         hasMoreItems: page == pageCount ? false : true,
         pageCount: pageCount,
         profiles: allProfiles.slice(
            page * PaginationCnt - PaginationCnt,
            page * PaginationCnt
         ),
      });
      // res.json(allProfiles);
   } catch (error) {
      Logger.error(`Api error ${error.message}`, __filename);
      return res.status(400).json({ error: "Server error" });
   }
});

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  GET /api/profile/me
@desc    Get my profile
@access  Private
******************************************************************************/
router.get("/me", auth, async (req, res) => {
   try {
      const myProfile = await Profile.findOne({
         user: req.user.id,
      }).populate("user", ["name", "email", "avatar"]);
      if (!myProfile) {
         return res.status(400).json([{ msg: "User profile is not found" }]);
      }
      res.json(myProfile);
   } catch (error) {
      Logger.error(`Api error ${error.message}`, __filename);
      return res.status(500).json([{ error: "Server error" }]);
   }
});

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  GET /api/profile/user/:userId
@desc    get a user profile by id
@access  Public
******************************************************************************/
router.get(
   "/user/:userId",
   [CheckIdisValid("userId", "User id not found")],
   async (req, res) => {
      try {
         const results = validationResult(req);
         console.log(req.errors);
         if (!results.isEmpty()) {
            res.status(400).json(results.array());
         }

         const myProfile = await Profile.findOne({
            user: req.params.userId,
         }).populate("user", ["name", "email", "avatar"]);
         if (!myProfile) {
            return res
               .status(400)
               .json({ errors: [{ msg: "User profile is not found" }] });
         }
         res.json(myProfile);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: "Server error" });
      }
   }
);

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  PUT /api/profile/experience
@desc    Update my user profile experience
@access  Private
******************************************************************************/
router.put(
   "/experience/",
   [
      auth,
      check("company").not().isEmpty(),
      check("title").not().isEmpty(),
      check("from").not().isEmpty(),
   ],
   async (req, res) => {
      try {
         const results = validationResult(req);
         if (!results.isEmpty()) {
            return res.status(400).json(results.array());
         }

         const myProfile = await Profile.findOne({
            user: req.user.id,
         }).populate("user", ["name", "email", "avatar"]);
         if (!myProfile) {
            return res
               .status(400)
               .json({ errors: { msg: "User profile is not found" } });
         }

         const { company, title, description, from, to, current } = req.body;
         const newExp = { company, title, description, from, to, current };
         myProfile.experience.unshift(newExp);
         await myProfile.save();
         res.json(myProfile);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: "Server error" });
      }
   }
);
/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  PUT /api/profile/education
@desc    Update my user profile education
@access  Private
******************************************************************************/
router.put(
   "/education/",
   [
      auth,
      check("school").not().isEmpty(),
      check("major").not().isEmpty(),
      check("degree").not().isEmpty(),
      check("from").not().isEmpty(),
   ],
   async (req, res) => {
      try {
         const results = validationResult(req);
         if (!results.isEmpty()) {
            return res.status(400).json(results.array());
         }

         const myProfile = await Profile.findOne({
            user: req.user.id,
         }).populate("user", ["name", "email", "avatar"]);
         if (!myProfile) {
            return res
               .status(400)
               .json({ errors: { msg: "User profile is not found" } });
         }

         const { school, major, degree, from, to, current } = req.body;
         const newEdu = { school, major, degree, from, to, current };
         myProfile.education.unshift(newEdu);
         await myProfile.save();
         res.json(myProfile);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: "Server error" });
      }
   }
);
/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes /api/profile/:id
@desc    follow a user
@access  Private
******************************************************************************/
router.put(
   "/follow/:userId",
   [auth, CheckInput("userId", "User id is not found").isValid()],
   async (req, res) => {
      const err = validationError(req);
      if (!err.isEmpty()) {
         return res.status(400).json(err.array());
      }
      try {
         const userProfile = await Profile.findOne({
            user: req.user.id,
         }).populate("user", ["name", "email", "avatar"]);
         if (!userProfile) {
            return res
               .status(400)
               .json({ errors: [{ msg: "User profile is not found" }] });
         }
         if (!userProfile.follows) {
            userProfile.follows = [];
         }
         if (
            userProfile.follows
               .map((follow) => follow.user)
               .includes(req.params.userId)
         ) {
            return res
               .status(400)
               .json({ errors: [{ msg: "User already followed" }] });
         }
         userProfile.follows.push({ user: req.params.userId });
         userProfile.save();
         res.json(userProfile.follows);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: "Server error" });
      }
   }
);

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  /api/profile/:id
@desc    unfollow a user
@access  Private
******************************************************************************/
router.put(
   "/unfollow/:userId",
   [auth, CheckInput("userId", "User id is not found").isValid()],
   async (req, res) => {
      const err = validationError(req);
      if (!err.isEmpty()) {
         return res.status(400).json(err.array());
      }
      try {
         const userProfile = await Profile.findOne({
            user: req.user.id,
         }).populate("user", ["name", "email", "avatar"]);
         if (!userProfile) {
            return res
               .status(400)
               .json({ errors: { msg: "User profile is not found" } });
         }
         if (!userProfile.follows) {
            userProfile.follows = [];
         }
         const match = userProfile.follows.find(
            (follow) => follow.user == req.params.userId
         );
         if (!match) {
            return res
               .status(400)
               .json([{ msg: "User is already unfollowed" }]);
         }

         userProfile.follows.splice(userProfile.follows.indexOf(match), 1);
         userProfile.save();
         res.json(userProfile.follows);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: "Server error" });
      }
   }
);

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  DELETE /api/profile/experience:id
@desc    Update 1 experience from user profile experiences 
@access  Private
******************************************************************************/
router.delete("/experience/:id", [auth], async (req, res) => {
   try {
      const myProfile = await Profile.findOne({
         user: req.user.id,
      }).populate("user", ["name", "email", "avatar"]);

      if (!myProfile) {
         return res
            .status(400)
            .json({ errors: { msg: "User profile is not found" } });
      }

      const exp = myProfile.experience.find((exp) => exp.id == req.params.id);

      if (!exp) {
         return res
            .status(400)
            .json({ errors: { msg: "experience is not found " } });
      }

      myProfile.experience.splice(myProfile.experience.indexOf(exp), 1);
      await myProfile.save();

      res.json(myProfile);
   } catch (error) {
      Logger.error(`Api error ${error.message}`, __filename);
      res.status(500).json({ error: "Server error" });
      return;
   }
});

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  DELETE /api/profile/education:id
@desc    Update 1 education from user profile educations 
@access  Private
******************************************************************************/

router.delete("/education/:id", [auth], async (req, res) => {
   try {
      const myProfile = await Profile.findOne({
         user: req.user.id,
      }).populate("user", ["name", "email", "avatar"]);

      if (!myProfile) {
         return res
            .status(400)
            .json({ errors: { msg: "User profile is not found" } });
      }
      const edu = myProfile.education.find((edu) => edu.id == req.params.id);

      if (!edu) {
         return res
            .status(400)
            .json({ errors: { msg: "Education is not found " } });
      }

      myProfile.education.splice(myProfile.education.indexOf(edu), 1);
      await myProfile.save();

      res.json(myProfile);
   } catch (error) {
      Logger.error(`Api error ${error.message}`, __filename);
      return res.status(500).json({ error: "Server error" });
   }
});
/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  PUT /api/profile/cover
@desc    Update cover phonto
@access  Private
******************************************************************************/
router.put("/cover/", [auth], async (req, res) => {
   try {
      const cover = req.files["cover"][0];
      const myProfile = await Profile.findOne({
         user: req.user.id,
      }).populate("user", ["name", "email", "avatar"]);
      if (!myProfile) {
         return res
            .status(400)
            .json({ errors: [{ msg: "User profile is not found" }] });
      }

      const s3 = new AWS.S3({
         accessKeyId: AWS_ID,
         secretAccessKey: AWS_KEY,
      });
      // const name = path.parse(avatar).base;
      const params = {
         Bucket: AWS_BUCKET_NAME,
         Key: `${myProfile.user.id}/cover/${cover.originalname}`,
         Body: fs.createReadStream(cover.path),
      };
      s3.deleteObject(
         {
            Bucket: "django-rest-proj-files",
            Key: myProfile.cover,
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
         myProfile.cover = data.Location;
         myProfile.save();
         fs.unlink(cover.path, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            // console.log("File deleted!");
         });
         res.json(myProfile);
      });
   } catch (error) {
      Logger.error(`Api error ${error.message}`, __filename);
      res.status(400).json({ errors: [{ msg: "Server error" }] });
   }
});
/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  DELETE /api/profile
@desc    Delete user, profile, posts, wall
@access  Private
******************************************************************************/
router.delete("/", auth, async (req, res) => {
   try {
      await Profile.findOneAndRemove({ user: req.user.id });

      await userWall.findOneAndRemove({ user: req.user.id });

      // await Post.deleteMany({ user: req.user.id });

      await Users.findByIdAndRemove({ _id: req.user.id });

      res.json({ msg: "User is removed" });
   } catch (error) {
      Logger.error(`Api error ${error.message}`, __filename);
      return res.status(500).json({ error: "Server error" });
   }
});

module.exports = router;

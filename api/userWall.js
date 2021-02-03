const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { validationResult, check } = require("express-validator");
const userWall = require("../models/UserWall");
const Logger = require("../util/logger");
const Users = require("../models/Users");
const { validationError, CheckInput } = require("../middleware/validator");
const { PaginationCnt } = require("../config/default");
/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  GET /api/wall/:wall_id
@desc    get user wall
@access  Private
******************************************************************************/
router.get("/:wall_id", async (req, res) => {
   try {
      Logger.log(`Wall retriving : ${req.params.wall_id}`, __filename);
      const UserWall = await userWall
         .findOne({ user: req.params.wall_id })
         .populate("user", ["_id", "name", "avatar"])
         .populate("posts.user", ["_id", "name", "avatar"])
         .populate("posts.comments.user", ["_id", "name", "avatar"]);

      if (!UserWall) {
         const user = await Users.findById(req.params.wall_id);
         if (user) {
            const newWall = new userWall({
               user: user.id,
            });
            await newWall.save();
            Logger.log(`Wall createdfor : ${user.email}`, __filename);
            res.json({
               user: UserWall.user,
               page: 1,
               hasMoreItems: false,
               pageCount: 1,
               posts: [],
            });
            return res
               .status(400)
               .json({ errors: { msg: "User wall not found" } });
         }
      }

      if (!UserWall.posts.length) {
         res.json({
            user: UserWall.user,
            page: 1,
            hasMoreItems: false,
            pageCount: 1,
            posts: [],
         });
      }

      const pageCount = Math.ceil(UserWall.posts.length / PaginationCnt);
      let isNewPosts = false;
      console.log("req.query.limit)", req.query);
      const prevPageCount = parseInt(req.query.limit);
      if (prevPageCount) {
         if (prevPageCount < pageCount) isNewPosts = true;
      }
      let page = parseInt(req.query.p);
      if (!page) {
         page = 1;
      }
      if (page > pageCount) {
         // page=pageCount
         console.log("page exceed");
         return res.status(400).json({ errors: [{ msg: "Invalid page" }] });
      }
      Logger.log(`Wall retrived for : ${req.params.wall_id}`, __filename);
      // UserWall.posts = UserWall.posts.sort((a, b) => b.date - a.date);
      res.json({
         user: UserWall.user,
         page: page,
         hasMoreItems: page == pageCount ? false : true,
         pageCount: pageCount,
         isNewPosts: isNewPosts,
         posts: UserWall.posts.slice(
            page * PaginationCnt - PaginationCnt,
            page * PaginationCnt
         ),
      });
   } catch (error) {
      Logger.error(`Api error ${error.message}`, __filename);
      return res.status(500).json({ error: "Server error" });
   }
});

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  POST /api/wall/:wall_id
@desc    create a post on a user wall
@access  Private
******************************************************************************/
router.post(
   "/:wall_id",
   [
      auth,
      //text must not empty
      check("text", "Please enter post content").not().isEmpty(),
   ],
   async (req, res) => {
      const results = validationResult(req);
      if (!results.isEmpty()) {
         return res.status(400).json(results.array());
      }
      try {
         Logger.log(`Wall post adding for : ${req.params.wall_id}`, __filename);
         const user = await Users.findById(req.user.id).select("-password");
         const UserWall = await userWall
            .findOne({ user: req.params.wall_id })
            .populate("user", ["_id", "name", "avatar"])
            .populate("posts.user", ["_id", "name", "avatar"])
            .populate("posts.comments.user", ["_id", "name", "avatar"]);

         if (!UserWall) {
            return res
               .status(400)
               .json({ errors: { msg: "User wall not found" } });
         }
         const newWallPost = {
            user: req.user.id,
            name: user.name,
            avatar: user.avatar,
            text: req.body.text,
            // date: Date.now(),
         };
         UserWall.posts.unshift(newWallPost);
         await UserWall.save();
         Logger.log(`Wall post added for : ${req.params.wall_id}`, __filename);
         const returnPost = {
            _id: UserWall.posts[0]._id,
            name: user.name,
            avatar: user.avatar,
            text: req.body.text,
            date: UserWall.posts[0].date,
            user: user,
            comments: [],
            likes: [],
         };
         res.json(returnPost);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(400).json({ error: "Server error" });
      }
   }
);

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  Delete /api/wall/:wall_id/:post_id
@desc    Delete a post from a user wall
@access  Private
******************************************************************************/
router.delete("/:wall_id/:post_id", [auth], async (req, res) => {
   const results = validationResult(req);
   if (!results.isEmpty()) {
      return res.status(400).json(results.array());
   }
   try {
      const user = await Users.findById(req.user.id);
      const UserWall = await userWall.findOne({ user: req.params.wall_id });

      if (!UserWall) {
         return res
            .status(400)
            .json({ errors: [{ msg: "User wall not found" }] });
      }
      const Post = UserWall.posts.find((post) => post.id == req.params.post_id);
      if (!Post) {
         return res
            .status(400)
            .json({ errors: [{ msg: "Wall Post not found" }] });
      }

      if (Post.user != req.user.id) {
         return res
            .status(401)
            .json({ erors: [{ msg: "User unauthorized " }] });
      }

      const index = UserWall.posts.indexOf(Post);
      UserWall.posts.splice(index, 1);
      await UserWall.save();
      res.json(UserWall.posts);
   } catch (error) {
      Logger.error(`Api error ${error.message}`, __filename);
      return res.status(500).json({ error: "Server error" });
   }
});

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  PUT /api/wall/comment/:wall_id/:post_id
@desc    Create a comment to a post from a user wall
@access  Private
******************************************************************************/
router.put(
   "/comment/:wall_id/:post_id",
   [
      auth,
      //text must not empty
      CheckInput("wall_id", "Wall id not found").isValid(),
      CheckInput("post_id", "Post id not found").isValid(),
      check("text", "Please enter post content").not().isEmpty(),
   ],
   async (req, res) => {
      const err = validationError(req);
      if (!err.isEmpty()) {
         return res.status(400).json(err.array());
      }

      const results = validationResult(req);
      if (!results.isEmpty()) {
         return res.status(400).json(results.array());
      }
      try {
         Logger.log(
            `Wall post comment adding for : ${req.params.wall_id}`,
            __filename
         );
         const user = await Users.findById(req.user.id).select("-password");
         let UserWall = await userWall
            .findOne({ user: req.params.wall_id })
            .populate("user", ["_id", "name", "avatar"])
            .populate("posts.user", ["_id", "name", "avatar"])
            .populate("posts.comments.user", ["_id", "name", "avatar"]);

         if (!UserWall) {
            return res
               .status(400)
               .json({ errors: [{ msg: "User wall not found" }] });
         }
         let Post = await UserWall.posts.find(
            (post) => post.id == req.params.post_id
         );
         if (!Post) {
            return res
               .status(400)
               .json({ errors: [{ msg: "User wall Post not found" }] });
         }
         const NewComment = {
            user: req.user.id,
            name: user.name,
            avatar: user.avatar,
            text: req.body.text,
         };
         Post.comments.push(NewComment);
         await UserWall.save();

         Logger.log(
            `Wall post comment added for : ${req.params.wall_id}`,
            __filename
         );
         const returnComments = Post.comments.map((comment) =>
            comment.user == req.user.id
               ? {
                    user: user,
                    name: user.name,
                    avatar: user.avatar,
                    text: req.body.text,
                    date: Date.now(),
                 }
               : comment
         );
         res.json(returnComments);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: "Server error" });
      }
   }
);

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  DELETE /api/wall/comment/:wall_id/:post_id
@desc    Delete a post from user wall
@access  Private
******************************************************************************/
router.delete(
   "/:wall_id/:post_id",
   [
      auth,
      CheckInput("wall_id", "User id not found").isValid(),
      CheckInput("post_id", "post id not found").isValid(),
   ],
   async (req, res) => {
      const results = validationResult(req);
      const err = validationError(req);
      if (!err.isEmpty()) {
         return res.status(400).json(err.array());
      }
      if (!results.isEmpty()) {
         return res.status(400).json(results.array());
      }
      try {
         const user = await Users.findById(req.user.id);
         const UserWall = await userWall.findOne({ user: req.params.wall_id });

         if (!UserWall) {
            return res
               .status(400)
               .json({ errors: { msg: "User wall not found" } });
         }
         const Post = UserWall.posts.find(
            (post) => post.id == req.params.post_id
         );
         if (!Post) {
            return res
               .status(400)
               .json({ errors: { msg: "Wall Post not found" } });
         }

         if (Post.user != req.user.id) {
            return res
               .status(401)
               .json({ erors: { msg: "User unauthorized " } });
         }

         const index = UserWall.posts.indexOf(Post);
         UserWall.posts.splice(index, 1);
         await UserWall.save();
         res.json(UserWall.posts);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: "Server error" });
      }
   }
);

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  PUT /api/comment/:wall_id/:post_id
@desc    Create a comment for a user wall post
@access  Private
******************************************************************************/
router.put(
   "/comment/:wall_id/:post_id",
   [
      auth,
      //text must not empty
      check("text", "Please enter post content").not().isEmpty(),
   ],
   async (req, res) => {
      const results = validationResult(req);
      if (!results.isEmpty()) {
         return res.status(400).json(results.array());
      }
      try {
         Logger.log(
            `Wall post comment adding for : ${req.params.wall_id}`,
            __filename
         );
         const user = await Users.findById(req.user.id);
         const UserWall = await userWall.findOne({ user: req.params.wall_id });

         if (!UserWall) {
            return res
               .status(400)
               .json({ errors: { msg: "User wall not found" } });
         }
         const Post = UserWall.posts.find(
            (post) => post.id == req.params.post_id
         );
         if (!Post) {
            return res
               .status(400)
               .json({ errors: { msg: "Wall Post not found" } });
         }
         const NewComment = {
            user: req.user.id,
            name: user.name,
            avatar: user.avatar,
            text: req.body.text,
            date: Date.now(),
         };
         Post.comments.unshift(NewComment);
         await UserWall.save();
         Logger.log(
            `Wall post comment added for : ${req.params.wall_id}`,
            __filename
         );
         res.json(Post.comments);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: "Server error" });
      }
   }
);

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  DELETE /api/wall/comment/:wallId/:postId/:commentId
@desc    Delete a comment from user wall post
@access  Private
******************************************************************************/
router.delete(
   "/comment/:wallId/:postId/:commentId",
   [
      auth,
      //text must not empty
      check("text", "Please enter post content").not().isEmpty(),
   ],
   async (req, res) => {
      const results = validationResult(req);
      if (!results.isEmpty()) {
         return res.status(400).json(results.array());
      }
      try {
         Logger.log(
            `Wall post comment adding for : ${req.params.wallId}`,
            __filename
         );
         const user = await Users.findById(req.user.id);
         const UserWall = await userWall.findOne({ user: req.params.wallId });

         if (!UserWall) {
            return res
               .status(400)
               .json({ errors: { msg: "User wall not found" } });
         }
         const Post = UserWall.posts.find(
            (post) => post.id == req.params.postId
         );
         if (!Post) {
            return res
               .status(400)
               .json({ errors: { msg: "Wall Post not found" } });
         }
         const comment = Post.comments.find(
            (comment) => comment.id == req.params.commentId
         );
         if (!comment) {
            return res
               .status(400)
               .json({ errors: { msg: "Wall Post comment not found" } });
         }
         if (comment.user != req.user.id) {
            return res
               .status(401)
               .json({ erors: { msg: "User unauthorized " } });
         }
         Post.comments = Post.comments.filter((com) => com != comment);
         await UserWall.save();
         Logger.log(
            `Wall post comment added for : ${req.params.wall_id}`,
            __filename
         );
         res.json(Post.comments);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: "Server error" });
      }
   }
);

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  PUT /api/wall/like/:wall_id/:post_id/
@desc    Like a user wall post
@access  Private
******************************************************************************/
router.put("/like/:wall_id/:post_id/", auth, async (req, res) => {
   const results = validationResult(req);
   if (!results.isEmpty()) {
      return res.status(400).json(results.array());
   }
   try {
      Logger.log(`Wall post liking for : ${req.params.post_id}`, __filename);
      const UserWall = await userWall.findOne({ user: req.params.wall_id });

      if (!UserWall) {
         return res
            .status(400)
            .json({ errors: { msg: "User wall not found" } });
      }

      const Post = UserWall.posts.find((post) => post.id == req.params.post_id);
      if (!Post) {
         return res
            .status(400)
            .json({ errors: { msg: "Wall Post not found" } });
      }
      if (Post.likes.find((like) => like.user == req.user.id)) {
         Logger.log(
            `Wall post is already liked: ${req.params.post_id}`,
            __filename
         );
         return res.status(400).json({ msg: "Post is already liked" });
      }
      Post.likes.unshift({ user: req.user.id });

      await UserWall.save();
      Logger.log(`Wall post liked for : ${req.params.post_id}`, __filename);
      res.json(Post.likes);
   } catch (error) {
      Logger.error(`Api error ${error.message}`, __filename);
      return res.status(401).json({ error: "Server error" });
   }
});

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  PUT /api/wall/unlike/:wall_id/:post_id/
@desc    Unlike a user wall post
@access  Private
******************************************************************************/
router.put("/unlike/:wall_id/:post_id", auth, async (req, res) => {
   const results = validationResult(req);
   if (!results.isEmpty()) {
      return res.status(400).json(results.array());
   }
   try {
      Logger.log(`Wall post unliking for : ${req.params.post_id}`, __filename);
      const UserWall = await userWall.findOne({ user: req.params.wall_id });

      if (!UserWall) {
         return res
            .status(400)
            .json({ errors: { msg: "User wall not found" } });
      }
      const Post = UserWall.posts.find((post) => post.id == req.params.post_id);
      if (!Post.likes.find((like) => like.user == req.user.id)) {
         Logger.log(
            `Wall post arleady unliked: ${req.params.post_id}`,
            __filename
         );
         return res.status(400).json({ msg: "Post is already unliked" });
      }
      Post.likes = Post.likes.filter((like) => like.user != req.user.id);
      console.log(Post.likes);
      await UserWall.save();
      Logger.log(`Wall post unliked for : ${req.params.post_id}`, __filename);
      res.json(Post.likes);
   } catch (error) {
      Logger.error(`Api error ${error.message}`, __filename);
      return res.status(500).json({ error: "Server error" });
   }
});
module.exports = router;

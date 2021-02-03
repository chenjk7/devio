const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const Logger = require('../util/logger');
const Users = require('../models/Users');
const Post = require('../models/Post');
const { validationError, CheckInput } = require('../middleware/validator');
const { json } = require('express');
const { PaginationCnt } = require('../config/default');
/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  /api/posts?p=#
@desc    get all post
@access  Public
******************************************************************************/
router.get('/', async (req, res) => {
   try {
      const posts = await Post.find()
         .sort({ date: -1 })
         .populate('user', ['_id', 'name', 'avatar'])
         .populate('comments.user', ['_id', 'name', 'avatar']);
      const pageCount = Math.ceil(posts.length / PaginationCnt);
      let page = parseInt(req.query.p);
      if (!page) {
         page = 1;
      }
      if (page > pageCount) {
         // page=pageCount
         return res.status().json({ errors: [{ msg: 'Invalid page' }] });
      }

      res.json({
         page: page,
         hasMoreItems: page == pageCount ? false : true,
         pageCount: pageCount,
         posts: posts.slice(
            page * PaginationCnt - PaginationCnt,
            page * PaginationCnt
         ),
      });
      // res.json(posts);
   } catch (error) {
      Logger.error(`Api error ${error.message}`, __filename);
      return res.status(500).json([{ msg: 'Server error' }]);
   }
});

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  /api/posts/bytag?tags={tag1,tag2}
@desc    get posts query by tag
@access  Public
******************************************************************************/
router.get(
   '/bytag',
   [CheckInput('tags').query().isQuery()],
   async (req, res) => {
      try {
         const err = validationError(req);
         if (!err.isEmpty()) {
            return res.status(400).json(err.array());
         }
         const tagsMatch = req.query.tags.split(',').map((tag) => tag.trim());
         const posts = await Post.find().sort({ date: -1 });
         const postFiltered = posts.filter((post) =>
            post.tags.some((tag) => tagsMatch.includes(tag))
         );

         res.json(postFiltered);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: 'Server error' });
      }
   }
);

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  /api/posts/
@desc    make a post
@access  Private
******************************************************************************/
router.post(
   '/',
   [
      auth,
      check('title', 'Title cannot be empty').not().isEmpty(),
      check('text', 'Content cannot be empty').not().isEmpty(),
   ],
   async (req, res) => {
      try {
         const results = validationResult(req);
         if (!results.isEmpty()) {
            return res.status(400).json(results.array());
         }
         const user = await Users.findById(req.user.id).select('-password');

         const newPost = new Post({
            user: req.user.id,
            name: user.name,
            avatar: user.avatar,
            title: req.body.title,
            text: req.body.text,
         });
         await newPost.save();

         res.json(newPost);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: 'Server error' });
      }
   }
);
/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  /api/posts/:postId
@desc    Delete a post by id 
@access  Private
******************************************************************************/
router.delete(
   '/:postId',
   [auth, CheckInput('postId', 'Post is not found').isValid()],
   async (req, res) => {
      try {
         const err = validationError(req);
         if (!err.isEmpty()) {
            return res.status(400).json(err.array());
         }

         const post = await Post.findById(req.params.postId);

         if (!post) {
            return res.status(400).json({
               errors: { msg: 'Post is not found' },
            });
         }
         if (post.user != req.user.id) {
            return res.status(401).json({
               errors: { msg: 'User unauthorized' },
            });
         }
         await Post.findByIdAndRemove(req.params.postId);
         res.json({ msg: 'Post deleted' });
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: 'Server error' });
      }
   }
);

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  /api/posts/:postId
@desc    Get a single post by id
@access  Public
******************************************************************************/
router.get(
   '/:postId',
   [CheckInput('postId', 'Post id is not found').isValid()],
   async (req, res) => {
      try {
         const err = validationError(req);
         if (!err.isEmpty()) {
            return res.status(400).json(err.array());
         }

         const post = await Post.findById(req.params.postId)
            .populate('user', ['_id', 'name', 'avatar'])
            .populate('comments.user', ['_id', 'name', 'avatar']);
         if (!post) {
            return res.status(400).json({
               errors: [{ msg: 'Post is not found' }],
            });
         }

         res.json(post);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: [{ msg: 'Server error' }] });
      }
   }
);
/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  /api/posts/comment/:postId
@desc    Make a comment to a post
@access  Private
******************************************************************************/
router.put(
   '/comment/:postId',
   [
      auth,
      CheckInput('postId', 'Post id is not found').isValid(),
      check('text', 'Content is empty').not().isEmpty(),
   ],
   async (req, res) => {
      try {
         const err = validationError(req);
         if (!err.isEmpty()) {
            return res.status(400).json(err.array());
         }
         const results = validationResult(req);
         if (!results.isEmpty()) {
            return res.status(400).json(results.array());
         }

         const post = await Post.findById(req.params.postId);
         if (!post) {
            return res.status(400).json({
               errors: [{ msg: 'Post is not found' }],
            });
         }

         const user = await Users.findById(req.user.id).select('-password');

         const newComment = {
            user: req.user.id,
            name: user.name,
            avatar: user.avatar,
            text: req.body.text,
         };
         post.comments.push(newComment);
         await post.save();
         const resPost = await Post.findById(req.params.postId)
            .populate('user', ['_id', 'name', 'avatar'])
            .populate('comments.user', ['_id', 'name', 'avatar']);
         res.json(resPost);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: 'Server error' });
      }
   }
);

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  /api/posts/comment/:postId/:commentId
@desc    delete a comment from a post
@access  Private
******************************************************************************/
router.delete(
   '/comment/:postId/:commentId',
   [
      auth,
      CheckInput('postId', 'Post id is not found').isValid(),
      CheckInput('commentId', 'Comment id is not found').isValid(),
   ],
   async (req, res) => {
      try {
         const err = validationError(req);
         if (!err.isEmpty()) {
            return res.status(400).json(err.array());
         }
         const results = validationResult(req);
         if (!results.isEmpty()) {
            return res.status(400).json(results.array());
         }

         const post = await Post.findById(req.params.postId);
         if (!post) {
            return res.status(400).json({
               errors: [{ msg: 'Post is not found' }],
            });
         }
         const comment = post.comments.find(
            (comment) => comment.id == req.params.commentId
         );
         if (!comment) {
            return res
               .status(400)
               .json({ errors: [{ msg: 'Post comment not found' }] });
         }
         if (comment.user != req.user.id) {
            return res
               .status(401)
               .json({ erors: [{ msg: 'User unauthorized ' }] });
         }
         post.comments = post.comments.filter((com) => com != comment);
         await post.save();
         res.json(post);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: 'Server error' });
      }
   }
);

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  /api/posts/like/:postId
@desc    Like a post
@access  Private
******************************************************************************/
router.put(
   '/like/:postId',
   [auth, CheckInput('postId', 'Post id is not found').isValid()],
   async (req, res) => {
      const err = validationError(req);
      if (!err.isEmpty()) {
         return res.status(400).json(err.array());
      }
      try {
         const post = await Post.findById(req.params.postId);
         if (!post) {
            return res.status(400).json({
               errors: [{ msg: 'Post is not found' }],
            });
         }
         if (post.likes.map((like) => like.user).includes(req.user.id)) {
            return res.status(400).json([{ msg: 'Post is already liked' }]);
         }
         post.likes.push({ user: req.user.id });
         post.save();
         res.json(post.likes);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: 'Server error' });
      }
   }
);

/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  /api/posts/unlike/:postId
@desc    Unlike a post
@access  Private
******************************************************************************/
router.put(
   '/unlike/:postId',
   [auth, CheckInput('postId', 'Post id is not found').isValid()],
   async (req, res) => {
      const err = validationError(req);
      if (!err.isEmpty()) {
         return res.status(400).json(err.array());
      }
      try {
         const post = await Post.findById(req.params.postId);
         if (!post) {
            return res.status(400).json({
               errors: { msg: 'Post is not found' },
            });
         }
         const match = post.likes.find((like) => like.user == req.user.id);
         if (!match) {
            return res.status(400).json({ msg: 'Post is already unliked' });
         }

         post.likes.splice(post.likes.indexOf(match), 1);
         post.save();
         res.json(post.likes);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: 'Server error' });
      }
   }
);
/******************************************************************************
-------------------------------- API ROUTE-------------------------------------
@routes  /api/posts/tags/:postId
@desc    Add tagas to a post
@access  Private
******************************************************************************/
router.put(
   '/tags/:postId',
   [
      auth,
      CheckInput('postId', 'Post id is not found').isValid(),
      check('tags', 'Content cannot be empty').not().isEmpty(),
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
         const post = await Post.findById(req.params.postId);
         if (!post) {
            return res.status(400).json({
               errors: { msg: 'Post is not found' },
            });
         }
         if (post.user != req.user.id) {
            return res.status(401).json({
               errors: { msg: 'User unauthorized' },
            });
         }
         post.tags = req.body.tags;
         post.save();
         res.json(post.tags);
      } catch (error) {
         Logger.error(`Api error ${error.message}`, __filename);
         return res.status(500).json({ error: 'Server error' });
      }
   }
);

module.exports = router;

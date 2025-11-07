const express = require('express');
const router = express.Router();
const postController = require('../controllers/postControllers');
const authMiddleware = require('../middleware/authMiddkeware');

// Create a post (auth required)
router.post('/', authMiddleware, postController.createPost);

// Get all posts (public, with pagination/search)
router.get('/', postController.getPosts);

// Get a single post by ID (public)
router.get('/:id', postController.getPostById);

// Update a post (auth required, only owner)
router.put('/:id', authMiddleware, postController.updatePost);

// Delete a post (auth required, only owner)
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
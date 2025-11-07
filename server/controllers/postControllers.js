const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, imageURL, content } = req.body;
    const username = req.user.username; // from auth middleware

    // Validation
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required.' });
    }
    if (title.length < 5 || title.length > 120) {
      return res.status(400).json({ message: 'Title must be 5-120 characters.' });
    }
    if (content.length < 50) {
      return res.status(400).json({ message: 'Content must be at least 50 characters.' });
    }

    const post = new Post({ title, imageURL, content, username });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', details: err.message });
  }
};

// Get all posts (with pagination and search)
exports.getPosts = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 10, username } = req.query;
    const query = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (username) {
      query.username = username;
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', details: err.message });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', details: err.message });
  }
};

// Update a post (only owner)
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });

    if (post.username !== req.user.username) {
      return res.status(403).json({ message: 'Not authorized.' });
    }

    const { title, imageURL, content } = req.body;
    if (title) {
      if (title.length < 5 || title.length > 120) {
        return res.status(400).json({ message: 'Title must be 5-120 characters.' });
      }
      post.title = title;
    }
    if (imageURL !== undefined) post.imageURL = imageURL;
    if (content) {
      if (content.length < 50) {
        return res.status(400).json({ message: 'Content must be at least 50 characters.' });
      }
      post.content = content;
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error.', details: err.message });
  }
};

// Delete a post (only owner)
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found.' });

    if (post.username !== req.user.username) {
      return res.status(403).json({ message: 'Not authorized.' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.', details: err.message });
  }
};
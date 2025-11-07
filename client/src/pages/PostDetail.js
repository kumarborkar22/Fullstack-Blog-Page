import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      setError('Failed to load post');
    }
  };

  if (error) return <p style={{color:'red'}}>{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      {post.imageURL && (
        <img src={post.imageURL} alt="post" style={{width: '300px'}} />
      )}
      <p>By: {post.username}</p>
      <p>{new Date(post.createdAt).toLocaleString()}</p>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetail;
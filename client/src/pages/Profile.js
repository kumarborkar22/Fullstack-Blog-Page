import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user) fetchMyPosts();
    // eslint-disable-next-line
  }, [user]);

  const fetchMyPosts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts?username=${user.username}`,
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );
      setPosts(res.data.posts);
    } catch (err) {
      setError('Failed to load your posts');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setSuccess('Post deleted!');
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (!user) return <p>Please login to view your profile.</p>;

  return (
    <div>
      <h2>{user.username}'s Posts</h2>
      {/* <button onClick={logout}>Logout</button> */}
      {error && <p style={{color:'red'}}>{error}</p>}
      {success && <p style={{color:'green'}}>{success}</p>}
      {posts.length === 0 && <p>No posts found.</p>}
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <Link to={`/post/${post._id}`}>
              <h3>{post.title}</h3>
            </Link>
            <Link to={`/edit/${post._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { toast } from 'react-toastify';

function CreatePost() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: '',
    imageURL: '',
    content: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    return <p>You must be logged in to create a post.</p>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/posts',
        form,
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      setSuccess('Post created!');
      setForm({ title: '', imageURL: '', content: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        /><br />
        <input
          type="text"
          name="imageURL"
          placeholder="Image URL (optional)"
          value={form.imageURL}
          onChange={handleChange}
        /><br />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          required
          minLength={50}
        /><br />
        <button type="submit">Create</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      {success && <p style={{color:'green'}}>{success}</p>}
    </div>
  );
}

export default CreatePost;
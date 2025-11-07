import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { toast } from 'react-toastify';

function EditPost() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: '',
    imageURL: '',
    content: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setForm({
        title: res.data.title,
        imageURL: res.data.imageURL || '',
        content: res.data.content
      });
    } catch (err) {
      setError('Failed to load post');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        form,
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      );
      setSuccess('Post updated!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    }
  };

  if (!user) return <p>Please login to edit posts.</p>;

  return (
    <div>
      <h2>Edit Post</h2>
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
        <button type="submit">Update</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      {success && <p style={{color:'green'}}>{success}</p>}
    </div>
  );
}

export default EditPost;
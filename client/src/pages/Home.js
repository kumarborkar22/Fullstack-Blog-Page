// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function Home() {
//   const [posts, setPosts] = useState([]);
//   const [search, setSearch] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchPosts();
//   }, [search]);

//   const fetchPosts = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/posts?search=${search}`
//       );
//       setPosts(res.data.posts);
//     } catch (err) {
//       setError('Failed to load posts');
//     }
//   };

//   return (
//     <div>
//       <h2>Blog Feed</h2>
//       <input
//         type="text"
//         placeholder="Search by title or author"
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//       />
//       {error && <p style={{color:'red'}}>{error}</p>}
//       {posts.length === 0 && <p>No posts found.</p>}
//       <ul>
//         {posts.map(post => (
//           <li key={post._id}>
//             <Link to={`/post/${post._id}`}>
//               <h3>{post.title}</h3>
//             </Link>
//             {post.imageURL && (
//               <img src={post.imageURL} alt="thumbnail" style={{width: '100px'}} />
//             )}
//             <p>By: {post.username}</p>
//             <p>{new Date(post.createdAt).toLocaleString()}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Home;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, [search]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/posts?search=${search}`
      );
      setPosts(res.data.posts);
    } catch (err) {
      setError('Failed to load posts');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Blog Feed</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      {posts.length === 0 && <p>No posts found.</p>}
      {posts.map(post => (
        <div className="card" key={post._id}>
          <Link to={`/post/${post._id}`}>
            <h3>{post.title}</h3>
          </Link>
          {post.imageURL && (
            <img src={post.imageURL} alt="thumbnail" />
          )}
          <p>By: {post.username}</p>
          <p>{new Date(post.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
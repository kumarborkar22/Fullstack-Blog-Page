import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{marginBottom: '20px'}}>
      <Link to="/">Home</Link> |{' '}
      {user ? (
        <>
          <Link to="/create">Create Post</Link> |{' '}
          <Link to="/profile">My Posts</Link> |{' '}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link> |{' '}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
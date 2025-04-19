import type React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    // Fake successful login, redirect to profile/dashboard
    navigate('/profile');
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', background: '#1A1026', padding: '2rem', borderRadius: 12, boxShadow: '0 2px 12px #0002', color: '#fff' }}>
      <h1 style={{ color: '#910A67', marginBottom: '1.2rem' }}>Login</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: 8 }}>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', background: '#fff', color: '#000', padding: 8, marginTop: 4, marginBottom: 16, borderRadius: 6 }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: 16 }}>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', background: '#fff', color: '#000', padding: 8, marginTop: 4, marginBottom: 4, borderRadius: 6 }}
          />
        </label>
        {error && <div style={{ color: '#ff557f', marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ background: '#910A67', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 18px', width: '100%', fontWeight: 600 }}>Login</button>
      </form>
      <div style={{ marginTop: 16, textAlign: 'center', fontSize: 15 }}>
        Don't have an account? <Link to="/signup" style={{ color: '#910A67', fontWeight: 600 }}>Sign up</Link>
      </div>
    </div>
  );
}

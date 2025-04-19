import type React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password || !confirm) {
      setError('Please fill out all fields.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    // Simulate successful registration
    navigate('/profile');
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', background: '#1A1026', padding: '2rem', borderRadius: 12, boxShadow: '0 2px 12px #0002', color: '#fff' }}>
      <h1 style={{ color: '#910A67', marginBottom: '1.2rem' }}>Sign Up</h1>
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
        <label style={{ display: 'block', marginBottom: 8 }}>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', background: '#fff', color: '#000', padding: 8, marginTop: 4, marginBottom: 16, borderRadius: 6 }}
          />
        </label>
        <label style={{ display: 'block', marginBottom: 16 }}>
          Confirm Password
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            style={{ width: '100%', background: '#fff', color: '#000', padding: 8, marginTop: 4, borderRadius: 6 }}
          />
        </label>
        {error && <div style={{ color: '#ff557f', marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ background: '#910A67', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 18px', width: '100%', fontWeight: 600 }}>Sign Up</button>
      </form>
      <div style={{ marginTop: 16, textAlign: 'center', fontSize: 15 }}>
        Already have an account? <Link to="/login" style={{ color: '#910A67', fontWeight: 600 }}>Login</Link>
      </div>
    </div>
  );
}

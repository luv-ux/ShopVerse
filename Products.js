import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form.email, form.password);
      if (user.role === 'seller') navigate('/seller');
      else navigate('/');
    } catch { setError('Invalid email or password'); }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 420 }}>
      <div className="card p-4">
        <h3 className="mb-3 text-center fw-bold">Login to ShopVerse</h3>
        <p className="text-muted small text-center">Try: admin@shopverse.com / admin123</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3"><label className="form-label">Email</label>
            <input type="email" className="form-control" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
          <div className="mb-3"><label className="form-label">Password</label>
            <input type="password" className="form-control" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3 mb-0">No account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

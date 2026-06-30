import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer', store_name: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await register(form); navigate('/login'); }
    catch (err) { setError(err.response?.data?.error || 'Registration failed'); }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 440 }}>
      <div className="card p-4">
        <h3 className="mb-3 text-center fw-bold">Create Account</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          {['name', 'email', 'password'].map(f => (
            <div className="mb-3" key={f}>
              <label className="form-label text-capitalize">{f}</label>
              <input type={f === 'password' ? 'password' : f === 'email' ? 'email' : 'text'} className="form-control" required
                value={form[f]} onChange={e => setForm({ ...form, [f]: e.target.value })} />
            </div>
          ))}
          <div className="mb-3"><label className="form-label">Account Type</label>
            <select className="form-select" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          {form.role === 'seller' && (
            <div className="mb-3"><label className="form-label">Store Name</label>
              <input className="form-control" value={form.store_name} onChange={e => setForm({ ...form, store_name: e.target.value })} />
            </div>
          )}
          <button type="submit" className="btn btn-primary w-100">Create Account</button>
        </form>
        <p className="text-center mt-3 mb-0">Have account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

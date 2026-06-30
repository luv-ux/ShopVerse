import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('sv_cart') || '[]');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">ShopVerse</Link>
        <div className="d-flex gap-2 align-items-center ms-auto">
          <Link to="/products" className="btn btn-sm btn-light">Products</Link>
          <Link to="/cart" className="btn btn-outline-secondary btn-sm">
            Cart <span className="badge bg-danger">{cart.length}</span>
          </Link>
          {user ? (
            <>
              {user.role === 'seller' && <Link to="/seller" className="btn btn-outline-primary btn-sm">Seller Panel</Link>}
              <Link to="/orders" className="btn btn-sm btn-light">My Orders</Link>
              <span className="text-muted small">Hi, {user.name}</span>
              <button onClick={() => { logout(); navigate('/'); }} className="btn btn-sm btn-light">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-outline-primary">Login</Link>
              <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

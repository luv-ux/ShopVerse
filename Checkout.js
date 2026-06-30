import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const API = 'http://localhost:5000/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => { axios.get(`${API}/products`).then(r => setProducts(r.data.products || [])); }, []);
  return (
    <div>
      <div className="py-5 text-white text-center" style={{ background: 'linear-gradient(135deg,#6c47ff,#ff6b35)' }}>
        <h1 className="display-4 fw-bold">Welcome to ShopVerse</h1>
        <p className="lead">Your multi-vendor marketplace</p>
        <Link to="/products" className="btn btn-light btn-lg mt-2">Browse Products</Link>
      </div>
      <div className="container py-5">
        <h2 className="mb-4">Featured Products</h2>
        <div className="row g-4">
          {products.slice(0, 8).map(p => (
            <div key={p.id} className="col-6 col-md-3">
              <div className="card product-card h-100">
                <div className="card-body">
                  <h6 className="card-title">{p.title}</h6>
                  <p className="text-muted small">{p.storeName}</p>
                  <p className="fw-bold text-primary">Rs.{Number(p.price).toLocaleString()}</p>
                  <Link to={`/products/${p.id}`} className="btn btn-primary btn-sm w-100">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

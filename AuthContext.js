import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const API = 'http://localhost:5000/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const fetchProducts = () => {
    axios.get(`${API}/products`, { params: { q: search } }).then(r => setProducts(r.data.products || []));
  };
  useEffect(fetchProducts, []);

  return (
    <div className="container py-4">
      <div className="d-flex gap-2 mb-4">
        <input className="form-control" placeholder="Search products..." value={search}
          onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && fetchProducts()} />
        <button className="btn btn-primary" onClick={fetchProducts}>Search</button>
      </div>
      <div className="row g-4">
        {products.map(p => (
          <div key={p.id} className="col-6 col-md-3">
            <div className="card product-card h-100">
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">{p.title}</h6>
                <p className="text-muted small flex-grow-1">{p.storeName}</p>
                <p className="fw-bold text-primary mb-2">Rs.{Number(p.price).toLocaleString()}</p>
                <Link to={`/products/${p.id}`} className="btn btn-primary btn-sm">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

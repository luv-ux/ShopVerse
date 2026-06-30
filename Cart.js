import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const API = 'http://localhost:5000/api';

export default function Seller() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', price: '', stock: '', categoryId: 1, storeId: 1 });

  const fetchProducts = () => axios.get(`${API}/products`).then(r => setProducts(r.data.products || []));
  useEffect(() => { fetchProducts(); }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/products`, form);
    alert('Product added!');
    setForm({ title: '', description: '', price: '', stock: '', categoryId: 1, storeId: 1 });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${API}/products/${id}`);
    fetchProducts();
  };

  if (!user) return <div className="container py-5 text-center"><p>Please login as a seller.</p></div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Seller Dashboard</h2>
      <p className="text-muted">Welcome, <strong>{user.name}</strong>!</p>
      <div className="card p-4 mb-4">
        <h5>Add New Product</h5>
        <form onSubmit={addProduct} className="row g-2">
          <div className="col-md-6"><input className="form-control" placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
          <div className="col-md-3"><input className="form-control" placeholder="Price" type="number" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></div>
          <div className="col-md-3"><input className="form-control" placeholder="Stock" type="number" required value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} /></div>
          <div className="col-12"><textarea className="form-control" placeholder="Description" rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
          <div className="col-12"><button type="submit" className="btn btn-primary">Add Product</button></div>
        </form>
      </div>
      <h5 className="mb-3">All Products ({products.length})</h5>
      <div className="row g-3">
        {products.map(p => (
          <div key={p.id} className="col-md-4">
            <div className="card p-3">
              <h6>{p.title}</h6>
              <p className="text-primary fw-bold">Rs.{Number(p.price).toLocaleString()}</p>
              <small className="text-muted">Stock: {p.stock}</small>
              <button className="btn btn-sm btn-outline-danger mt-2" onClick={() => deleteProduct(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const API = 'http://localhost:5000/api';
const statusColor = { pending: 'warning', processing: 'info', shipped: 'primary', delivered: 'success', cancelled: 'danger' };

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) axios.get(`${API}/orders`, { params: { buyerId: user.id } }).then(r => setOrders(r.data.orders || []));
  }, [user]);

  if (!user) return <div className="container py-5 text-center"><p>Please login to view orders.</p></div>;

  return (
    <div className="container py-4" style={{ maxWidth: 700 }}>
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0
        ? <p className="text-muted">No orders yet.</p>
        : orders.map(o => (
          <div key={o.id} className="card mb-3 p-3">
            <div className="d-flex justify-content-between">
              <div>
                <strong>Order #{o.id}</strong>
                <p className="text-muted mb-1 small">{new Date(o.createdAt).toLocaleDateString()}</p>
                <small>{o.items.length} item(s)</small>
              </div>
              <div className="text-end">
                <p className="fw-bold text-primary">Rs.{Number(o.total).toLocaleString()}</p>
                <span className={`badge bg-${statusColor[o.status] || 'secondary'}`}>{o.status}</span>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

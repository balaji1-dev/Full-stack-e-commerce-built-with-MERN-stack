import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <h2 style={{textAlign: 'center', marginTop: '50px'}}>Loading...</h2>;

  return (
    <div className="container">
      <h1>Our Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img 
              src={product.image} 
              alt={product.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='220'%3E%3Crect width='300' height='220' fill='%23667eea'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='20' text-anchor='middle' dy='.3em'%3E${product.category}%3C/text%3E%3C/svg%3E`;
              }}
            />
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="price">₹{product.price.toLocaleString()}</p>
            <p className="rating">⭐ {product.rating} ({product.numReviews} reviews)</p>
            <p className="stock">Stock: {product.stock}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
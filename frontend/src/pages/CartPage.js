import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';

function CartPage({ onNavigate }) {
  const { items, totalPrice, totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    if (window.confirm('Remove this item from cart?')) {
      dispatch(removeFromCart(id));
    }
  };

  const handleQuantityChange = (id, newQuantity, stock) => {
    if (newQuantity > stock) {
      alert(`Only ${stock} items available in stock!`);
      return;
    }
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: parseInt(newQuantity) }));
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Clear entire cart?')) {
      dispatch(clearCart());
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>Add some products to get started!</p>
        <button onClick={() => onNavigate('home')} className="continue-shopping">
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart ({totalQuantity} items)</h1>
        <button onClick={handleClearCart} className="clear-cart-btn">
          Clear Cart
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {items.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">₹{item.price.toLocaleString()}</p>
                <p className="stock-info">Stock: {item.stock}</p>
              </div>

              <div className="quantity-control">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={item.stock}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, e.target.value, item.stock)}
                />
              </div>

              <div className="item-total">
                <p>₹{item.totalPrice.toLocaleString()}</p>
              </div>

              <button 
                onClick={() => handleRemove(item._id)} 
                className="remove-btn"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal ({totalQuantity} items):</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>FREE</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <button className="checkout-btn">
            Proceed to Checkout
          </button>
          <button onClick={() => onNavigate('home')} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
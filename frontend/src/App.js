import './App.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/authSlice';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';

function App() {
  const { totalQuantity } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState('home');
  const dispatch = useDispatch();

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logout());
      alert('Logged out successfully!');
      navigate('home');
    }
  };

  return (
    <div className="App">
      <header>
        <h1>🛒 My E-Commerce Store</h1>
        <nav>
          <button onClick={() => navigate('home')}>Home</button>
          <button onClick={() => navigate('cart')}>Cart ({totalQuantity})</button>
          
          {isAuthenticated ? (
            <>
              <span className="user-name">Hi, {user.name}!</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button onClick={() => navigate('login')}>Login</button>
          )}
        </nav>
      </header>
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'cart' && <CartPage onNavigate={navigate} />}
      {currentPage === 'login' && <LoginPage onNavigate={navigate} />}
    </div>
  );
}

export default App;
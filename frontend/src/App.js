import './App.css';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <header>
        <h1>🛒 My E-Commerce Store</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/cart">Cart (0)</a>
        </nav>
      </header>
      <HomePage />
    </div>
  );
}

export default App;
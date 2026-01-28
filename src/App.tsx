import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/Products/Products';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Admin from './components/Admin/Admin';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

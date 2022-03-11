import './App.css';
import Navbar from './components/nav/Navbar';
import MenuPage from './components/menu-page/MenuPage';
import Cart from './components/cart/Cart';
import Settings from './components/settings/Settings';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

function App() {
  
  return (
    <BrowserRouter>
    
      <div className="App">
        
        <Navbar />

        <Routes>
          <Route path='/' element={<MenuPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;

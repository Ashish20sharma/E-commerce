import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Addproduct from './components/Addproduct';
import PrivateComponents from './components/PrivateComponents';
import Editproduct from './components/Editproduct';
import Cart from './components/Cart';
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponents/>}>
            <Route path='/' element={<Home />} />
            <Route path='/addproduct' element={<Addproduct />} />
            <Route path='/editproduct/:id' element={<Editproduct />} />
            <Route path='/cart' element={<Cart/>}/>
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

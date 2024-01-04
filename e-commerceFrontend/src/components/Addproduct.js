import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function Addproduct() {
  const user = JSON.parse(localStorage.getItem('user'))
  const userid = user._id
  const [product, setProduct] = useState({ user_id: userid, name: '', company: '', category: '', price: '' })
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const handleProduct = () => {
    if (!product.name || !product.user_id || !product.company || !product.price || !product.category){
      setError(true)
      return;
    }
      axios.post('http://127.0.0.1:5000/products/item', product).then((res, err) => {
        if (res.status === 200) {
          navigate('/')
          setProduct({})
        } else {
          toast('Something is wrong')
        }
      })
  }
  return (
    <div className=' bg-dark d-flex' style={{ "width": '100%', "min-height": '100vh' }}>
      <div className='container d-flex align-items-center justify-content-center flex-column gap-2'>
        <h3 className='text-light'>Add Product</h3>
        <div className='col-auto'>
          <input className='form-control' value={product.name} onInput={(e) => setProduct({ ...product, name: e.target.value })} type='text' placeholder='Enter product name' name='name' style={{ "width": "250px" }} />
          {error && !product.name && <span className='text-danger'>*Invalid product name</span>}
        </div>
        <div className='col-auto'>
          <input className='form-control' value={product.company} onInput={(e) => setProduct({ ...product, company: e.target.value })} type='text' placeholder='Enter product company' name='company' style={{ "width": "250px" }} />
          {error && !product.company && <span className='text-danger'>*Invalid company name</span>}
        </div>
        <div className='col-auto'>
          <input className='form-control' value={product.category} onInput={(e) => setProduct({ ...product, category: e.target.value })} type='text' placeholder='Enter product category' name='category' style={{ "width": "250px" }} />
          {error && !product.category && <span className='text-danger'>*Invalid product category</span>}

        </div>
        <div className='col-auto'>
          <input className='form-control' value={product.price} onInput={(e) => setProduct({ ...product, price: e.target.value })} type='text' placeholder='Enter product price' name='price' style={{ "width": "250px" }} />
          {error && !product.price && <span className='text-danger'>*Invalid product price</span>}
        </div>
        <div className='col-auto'>
          <button onClick={() => handleProduct()} className='btn btn-primary' style={{ "width": "170px" }}>Addproduct</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Addproduct

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Editproduct() {
    const navigate=useNavigate()
    const [editProduct,seteditProduct]=useState({})
    const params=useParams()
    useEffect(()=>{
        axios.post(`http://127.0.0.1:5000/products/editproduct/${params.id}`).then((result,err)=>{
           seteditProduct({name:result.data.result.name,company:result.data.result.company,category:result.data.result.category,price:result.data.result.price})
        })
    },[])
    const handleeditProduct=()=>{
        axios.post(`http://127.0.0.1:5000/products/editproduct/${params.id}`,editProduct).then(((res,err)=>{
            navigate('/')
        }))
    }
  return (
    <>
    <div className=' bg-dark d-flex' style={{ "width": '100%', "min-height": '100vh' }}>
      <div className='container d-flex align-items-center justify-content-center flex-column gap-2'>
        <h3 className='text-light'>Edit Product</h3>
        <div className='col-auto'>
          <input className='form-control' value={editProduct.name} onInput={(e) => seteditProduct({ ...editProduct, name: e.target.value })} type='text' placeholder='Enter product name' name='name' style={{ "width": "250px" }} />
          {/* {error && !product.name && <span className='text-danger'>*Invalid product name</span>} */}
        </div>
        <div className='col-auto'>
          <input className='form-control' value={editProduct.company} onInput={(e) => seteditProduct({ ...editProduct, company: e.target.value })} type='text' placeholder='Enter product company' name='company' style={{ "width": "250px" }} />
          {/* {error && !product.company && <span className='text-danger'>*Invalid company name</span>} */}
        </div>
        <div className='col-auto'>
          <input className='form-control' value={editProduct.category} onInput={(e) => seteditProduct({ ...editProduct, category: e.target.value })} type='text' placeholder='Enter product category' name='category' style={{ "width": "250px" }} />
          {/* {error && !product.category && <span className='text-danger'>*Invalid product category</span>} */}

        </div>
        <div className='col-auto'>
          <input className='form-control' value={editProduct.price} onInput={(e) => seteditProduct({ ...editProduct, price: e.target.value })} type='text' placeholder='Enter product price' name='price' style={{ "width": "250px" }} />
          {/* {error && !product.price && <span className='text-danger'>*Invalid product price</span>} */}
        </div>
        <div className='col-auto'>
          <button onClick={() => handleeditProduct()} className='btn btn-primary' style={{ "width": "170px" }}>Edit product</button>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
    </>
  )
}

export default Editproduct

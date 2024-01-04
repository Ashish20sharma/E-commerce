import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function Home() {
  const [allproduct, setAllproduct] = useState([])
  const ref=useRef(null)
  useEffect(() => {
    ref.current.focus()
    getproduct();
  }, [])

  const getproduct = () => {
    axios.get('http://127.0.0.1:5000/products/getproducts',{headers:{autherization:`bearer ${JSON.parse(localStorage.getItem('user jwt'))}`}}).then((result, err) => {
      setAllproduct(result.data.result)
    })
  }
  const handledelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/products/deleteproduct/${id}`).then((result, err) => {
      getproduct();
    })
  }

  const handleSearch = (e) => {
    if (e.target.value) {
      axios.get(`http://127.0.0.1:5000/products/search/${e.target.value}`).then((result, err) => {
        setAllproduct(result.data)
      })
    } else {
      getproduct();
    }
  }
  
  return (
    <>
      <div className='container mt-5'>
        <div className='m-5'>
          <h4>Search product</h4>
          <input ref={ref} onInput={(e) => handleSearch(e)} className='form-control' placeholder='Search product here' />
        </div>
        <div className='row'>
          <div className='col-md-2'>
            <h4>S.No.</h4>
          </div>
          <div className='col-md-2'>
            <h4>Name</h4>
          </div>
          <div className='col-md-2'>
            <h4>Company</h4>
          </div>
          <div className='col-md-2'>
            <h4>Category</h4>
          </div>
          <div className='col-md-2'>
            <h4>Price</h4>
          </div>
          <div className='col-md-2'>
            <h4>Delete & Edit</h4>
          </div>
        </div>
        {allproduct.length > 0 ? allproduct.map((item, index) => {
          return <div className='row mt-2'>
            <div className='col-md-2 '>
              <h6>{index + 1}</h6>
            </div>
            <div className='col-md-2'>
              <h6>{item.name}</h6>
            </div>
            <div className='col-md-2'>
              <h6>{item.company}</h6>
            </div>
            <div className='col-md-2'>
              <h6>{item.category}</h6>
            </div>
            <div className='col-md-2'>
              <h6>{item.price}</h6>
            </div>
            <div className='col-md-2 '>
              <button onClick={() => handledelete(item._id)} className='btn btn-primary me-2 '>Delete</button>
              <Link to={`/editproduct/${item._id}`} className='btn btn-primary '>Edit</Link>
            </div>
          </div>
        }) : <h3>No products</h3>}
      </div>
    </>
  )
}

export default Home

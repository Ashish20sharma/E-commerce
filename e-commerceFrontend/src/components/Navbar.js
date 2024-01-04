import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const auth = JSON.parse(localStorage.getItem('user'))
    const navigate=useNavigate()
    const handlelogout = () => {
            localStorage.clear()
            navigate('/login')
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
           { auth ? <div className="container-fluid">
                <Link to='/' className="navbar-brand" >E-commerce</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to='/' className="nav-link active" aria-current="page" href="#">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/addproduct' className="nav-link" href="#">Add Product</Link>
                        </li>
                    </ul>
                    <div className='Addcart' style={{marginRight:"20px"}}>
                    <Link className='nav-link' to="/cart"style={{color:"black",listStyle:"none"}}><i class="ri-shopping-cart-fill" style={{fontSize:"25px"}}></i>{0}</Link>
                    </div>
                    <form className="d-flex " >
                        <Link onClick={() => handlelogout()} to='/login' className='btn btn-outline-primary '>Logout ({auth.name})</Link>     
                    </form>
                </div>
            </div>:<div className="container-fluid">
                <Link to='/' className="navbar-brand" >E-commerce</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                    </ul>
                    <form className="d-flex " role="search">
                         <Link to='/register' className="btn btn-outline-primary me-2" >Signup</Link>
                            <Link to='/login' className='btn btn-outline-primary '>Signin</Link>
                    </form>
                </div>
            </div>}
        </nav>
    )
}

export default Navbar

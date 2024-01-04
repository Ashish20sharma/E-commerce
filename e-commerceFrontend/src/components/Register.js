import React, {  useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
function Register() {
    const [user, setUser] = useState({})
    const navigate=useNavigate()
    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    })
    const handleUser = () => {
        if(user.password === user.Cpassword ){
        axios.post('http://127.0.0.1:5000/user/register',user).then((res,err)=>{
            if(res.status===200){
                navigate('/login')
            }else{
                toast("Invalid details")
            }
        })
        }else{
            toast('Invalid details')
        }
    }
    return (
        <div className=' bg-dark d-flex' style={{ "width": '100%', "min-height": '100vh' }}>
            <div className='container d-flex align-items-center justify-content-center flex-column gap-2'>
                <div className='col-auto'>
                    <input className='form-control' onInput={(e) => setUser({ ...user, name: e.target.value })} type='text' placeholder='Name' name='name' style={{ "width": "250px" }} />
                </div>
                <div className='col-auto'>
                    <input className='form-control' onInput={(e) => setUser({ ...user, email: e.target.value })} type='email' placeholder='Email' name='email' style={{ "width": "250px" }} />
                </div>
                <div className='col-auto'>
                    <input className='form-control' onInput={(e) => setUser({ ...user, number: e.target.value })} type='number' placeholder='Contact' name='contact' style={{ "width": "250px" }} />
                </div>
                <div className='col-auto'>
                    <input className='form-control' onInput={(e) => setUser({ ...user, password: e.target.value })} type='password' placeholder='Password' name='password' style={{ "width": "250px" }} />
                </div>
                <div className='col-auto'>
                    <input className='form-control' onInput={(e) => setUser({ ...user, Cpassword: e.target.value })} type='password' placeholder='Conform password' name='Conform password' style={{ "width": "250px" }} />
                </div>
                <div className='col-auto'>
                    <button onClick={() => handleUser()} className='btn btn-primary' style={{ "width": "170px" }}>Sign up</button>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Register

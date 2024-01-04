import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'

function Login() {
    const [login, setLogin] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    })
    const handleLogin = () => {
        axios.post("http://127.0.0.1:5000/user/login", login).then((res, err) => {
            if (res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data.result))
                localStorage.setItem('user jwt', JSON.stringify(res.data.jwt))
                navigate("/")
            } else {
                toast('Invalid details')
            }
        })
    }

    return (
        <div className=' bg-dark d-flex' style={{ "width": '100%', "min-height": '93vh' }}>
            <div className='container d-flex align-items-center justify-content-center flex-column gap-2'>
                <div className='col-auto'>
                    <input className='form-control' onInput={(e) => setLogin({ ...login, email: e.target.value })} type='email' placeholder='Email' name='email' style={{ "width": "250px" }} />
                </div>
                <div className='col-auto'>
                    <input className='form-control' onInput={(e) => setLogin({ ...login, password: e.target.value })} type='password' placeholder='Password' name='password' style={{ "width": "250px" }} />
                </div>
                <div className='col-auto'>
                    <button onClick={() => handleLogin()} className='btn btn-primary' style={{ "width": "150px" }}>Login</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login

import React from 'react'
import {Outlet,Navigate } from 'react-router-dom'
function PrivateComponents() {
    const auth=localStorage.getItem('user')
  return (
    auth?<Outlet/>:<Navigate to='/register' />
  )
}

export default PrivateComponents

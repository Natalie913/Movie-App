import React from 'react'
import {useAuth} from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
    const { currentUser } = useAuth()
    console.log(currentUser)
    return currentUser ? <Outlet/> : <Navigate to='/login' replace />
}
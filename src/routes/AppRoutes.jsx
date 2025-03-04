import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, MovieDetails, Register } from '../pages'
import PrivateRoute from './PrivateRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      {/* Private routes */}
      <Route element={<PrivateRoute />}>
        <Route path='/details/:id' element={<MovieDetails />} />
      </Route>
    </Routes>
  )
}
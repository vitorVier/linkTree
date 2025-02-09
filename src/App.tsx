import { createBrowserRouter } from 'react-router-dom';

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Home } from './pages/home';
import { Admin } from './pages/admin';
import { Login } from './pages/login';
import { Networks } from './pages/networks';

import { Private } from './routes/Private';
import { ErrorPage } from './pages/notFound';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/admin',
    element: <Private><Admin/></Private>
  },
  {
    path:'/admin/social',
    element: <Private><Networks/></Private>
  },
  {
    path:'*',
    element: <ErrorPage/>
  }
])

export { router };
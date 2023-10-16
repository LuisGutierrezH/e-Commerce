import { Routes, Route } from 'react-router-dom'
import { Home, Dashboard, Login, Secret, Signup, Carrito } from '@/Pages'
import { useAuthContext } from '@/hooks/useAuthContext'

const RoutesIndex = () => {
  const { isAuth } = useAuthContext()

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route
        path='/dashboard'
        element={
          isAuth
            ? <Dashboard />
            : <Login />
        }
      />
      <Route path='/login' element={<Login />} />
      <Route
        path='/secret'
        element={
          isAuth
            ? <Secret />
            : <Login />
        }
      />
      <Route path='/signup' element={<Signup />} />
      <Route path='/carrito' element={<Carrito />} />
    </Routes>
  )
}
export default RoutesIndex

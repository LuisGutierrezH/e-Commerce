import { createContext, useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'

// 1. Crear el contexto
const AuthContext = createContext()

// 2. Crear el proveedor del contexto
function AuthProvider ({ children }) {
  const [isAuth, setIsAuth] = useState(false) // ¿Estoy autenticado?
  const [userPayload, setUserPayload] = useState(null) // jwt Payload decodificado

  const login = (token) => {
    localStorage.setItem('token', token)
    const decoded = jwtDecode(token) // Decodifica el payload del token
    setUserPayload(decoded)
    setIsAuth(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUserPayload(null) // Borro el payload del estado
    setIsAuth(false)
  }

  useEffect(() => {
    // recuperar el token del localStorage, si no existe devolvera null
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = jwtDecode(token) // Decodifica el payload del token
      setUserPayload(decoded)
      setIsAuth(true)
    }
  }, [])

  const data = {
    isAuth,
    userPayload,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }

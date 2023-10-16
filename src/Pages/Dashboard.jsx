import { useState, useEffect } from 'react'
import { getMeUserService } from '@/services/userServices'

const Dashboard = () => {
  const [userData, setUserData] = useState({})
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMeUserService(token)
        if (response.status === 200) {
          setUserData(response.data)
        }
      } catch (error) {
        console.log('Ocurrio un error en Dashboard', error)
      }
    }
    fetchUserData()
  }, [token])

  return (
    <>
      <h1>Dashboard</h1>
      {
        userData?.first_name && <p>{userData.first_name}</p>
      }
      {
        userData?.last_name && <p>{userData.last_name}</p>
      }
      {
        userData?.gender && <p>{userData.gender}</p>
      }
      {
        userData?.email && <p>{userData.email}</p>
      }
      {
        userData?.role && <p>{userData.role}</p>
      }
    </>
  )
}

export default Dashboard

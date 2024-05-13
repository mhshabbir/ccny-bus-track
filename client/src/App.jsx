import React, { useEffect, useState } from 'react'
import LoginPage from './pages/LoginPage'
import { Routes, Route, useNavigate} from 'react-router-dom'
import RegisterPage from './pages/Register'
import HomePage from './pages/HomePage'
import Ccny from './pages/CCNY'
import Street125 from './pages/Street125'
import Street145 from './pages/Street145'
import Login from './components/Login'
import Navbar from './components/navbar/navbar'
import QrCode from './pages/QrCode'
import UserProfile from './pages/UserProfile'
import PublicSafety from './pages/PublicSafety'
import Schedule from './pages/schedule'
import MapPage from './pages/MapPage'

const App = () => {
  let Navigate = useNavigate()
  const [token, setToken] = useState(false)

  if(token){
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(()=> {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  },[])


  return (
    <>
      <Navbar token={token} setToken={setToken}/>
      <Routes>
        <Route path='/' element={<HomePage token={token} />}/>
        <Route path='/login' element={<Login setToken={setToken}/>}/>
        <Route path='/signup' element={<RegisterPage/>} />
        <Route path='/qrcode' element={<QrCode token={token}/>} />
        <Route path='/home' element={<HomePage token={token} />}/>
        <Route path='/ccny' element={<Ccny token={token} />}/>
        <Route path='/Street125' element={<Street125 token={token} />}/>
        <Route path='/Street145' element={<Street145 token={token} />}/>
        <Route path='/publicsafety' element={<PublicSafety token={token} />}/>
      </Routes>
    </>
  )
}

export default App






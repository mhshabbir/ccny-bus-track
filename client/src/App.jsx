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

const App = () => {
  let navigate = useNavigate()
  const [token, setToken] = useState(false)

  if(token){
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(()=> {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  }, [])


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login setToken={setToken}/>}/>
        {token?<Route path='/' element={<LoginPage setToken={setToken}/>}/> : <Route path='/' element={<Login setToken={setToken}/>}/> }
        <Route path='/login' element={<Login setToken={setToken}/>}/>
        <Route path='/signup' element={<RegisterPage/>} />
        {token?<Route path='/home' element={<HomePage />}/>:""}
        {token?<Route path='/CCNY' element={<Ccny/>}/>:""}
        {token?<Route path='/Street125' element={<Street125/>}/>:""}
        {token?<Route path='/Street145' element={<Street145/>}/>:""}
      </Routes>
    </>
  )
}

export default App


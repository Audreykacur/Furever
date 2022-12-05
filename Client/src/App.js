import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import FureverHomePage from './pages/FureverHomePage'
import NewUsers from './pages/NewUsers'
import ControlPanel from './pages/ControlPanel'
import { useCookies } from 'react-cookie'
import Contact from './pages/Contact'

const App = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookies.AuthToken

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FureverHomePage />} />
        {authToken && <Route path="/userform" element={<NewUsers />} />}
       {authToken && <Route path="/furever" element={<ControlPanel/>} />}
       <Route path="/contact" element={<Contact/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

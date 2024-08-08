import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PacienteList from './pages/paciente/PacienteList'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<PacienteList/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PacienteList from './pages/paciente/PacienteList'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <div className="container">
    <Routes>
        <Route path="/" element={<PacienteList/>} />
        <Route path="/listar-pacientes" element={<PacienteList/>}/>
    </Routes> 
    </div>
    
    </BrowserRouter>
  )
}

export default App
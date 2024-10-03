import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/NavBar'
import MedicoList from './pages/medico/MedicoList'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
    <div>
      <Routes>
        <Route path='/listar-medicos' element={<MedicoList/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="menu">
        <div className="logo">
            <Link to="/">
                <img src="/logo-clinica-medica.png" alt="Logo do Sistema" className="logo-img" />
            </Link>
        </div>
        <div className="menu-links">
            <Link to="/add-paciente">Adicionar Paciente</Link>
            <Link to="/listar-pacientes">Listar Paciente</Link>
            <Link to="/add-medico">Adicionar Médico</Link>
            <Link to="/listar-medico">Listar Médico</Link>
            <Link to="/add-especialidade">Adicionar Especilidade</Link>
            <Link to="/listar-especialidade">Listar Especialidade</Link>
        </div>

    </nav>
  )
}

export default Navbar
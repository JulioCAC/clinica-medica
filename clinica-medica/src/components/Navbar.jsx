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
            <Link to="/add-funcionario">Adicionar Funcionario</Link>
            <Link to="/listar-funcionario">Listar Funcionario</Link>
            <Link to="/add-paciente">Adicionar Paciente</Link>
            <Link to="/listar-pacientes">Listar Paciente</Link>
        </div>

    </nav>
  )
}

export default Navbar
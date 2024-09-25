import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [dropDownAberto, setDropDownAberto] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const toggleDropDown = () => {
    setDropDownAberto((prevState) => !prevState);
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDownAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="menu">
      <div className="logo-container">
        <Link to="/">
          <img
            src="/logomedico.png"
            alt="Logo do Sistema"
            className="logo-img"
          />
        </Link>
      </div>
      <div className="menu-links">
        <Link to="/" className={isActive("/")}>
          Inicio
        </Link>
        <Link to="/add-medicos" className={isActive("/add-medicos")}>
          Adicionar Médico
        </Link>
        <Link to="/listar-medicos" className={isActive("/listar-medicos")}>
          Listar Médicos
        </Link>
        <Link to="/add-pacientes" className={isActive("/add-pacientes")}>
          Adicionar Paciente
        </Link>
        <Link to="/listar-pacientes" className={isActive("/listar-pacientes")}>
          Listar Pacientes
        </Link>
        <Link to="/add-consultas" className={isActive("/add-consultas")}>
          Adicionar Consulta
        </Link>
        <Link to="/listar-consultas" className={isActive("/listar-consultas")}>
          Listar Consultas
        </Link>
      </div>
      <div className="avatar-container" ref={dropdownRef}>
        <FaUserCircle
          className="avatar-icon"
          onClick={toggleDropDown}
          aria-expanded={dropDownAberto}
          aria-controls="dropdown-menu"
        />
        {dropDownAberto && (
          <div id="dropdown-menu" className="dropdown-menu">
            <Link to={"/meu-usuario"}>Meu usuário</Link>
            <Link to={"/sair"}>Sair</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

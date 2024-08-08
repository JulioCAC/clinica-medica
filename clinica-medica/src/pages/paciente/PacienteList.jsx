import React, { useEffect, useState } from 'react'
import axios from '../../api'
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa'
import Modal from 'react-modal'

const PacienteList = () => {
    const [pacientes, setPacientes] = useState([])
    const [pacienteSelecionado, setPacienteSelecionado] = useState(null)
    const [modalAberto, setModalAberto] = useState(false)
    const [modalSucessoAberto, setModalSucessoAberto] = useState(false)

    useEffect(() => {
        const buscarPacientes = () => {
            axios.get('/pacientes')
            .then(response => {
                setPacientes(response.data)
            })
            .catch(error => {
                console.error("Ocorreu um erro", error)
            })
        }
        buscarPacientes()
    }, [])

    const abrirModal = (paciente) => {
        setPacienteSelecionado(paciente)
        setModalAberto(true)
    }

    const fecharModal = () => {
        setModalAberto(false)
        setPacienteSelecionado(null) 
    }

    const abrirModalSucesso = () => {
        setModalSucessoAberto(true)
        setTimeout(() => setModalSucessoAberto(false), 1000)
    }

    const removerPaciente = () => {
        if (pacienteSelecionado) {
            axios.delete(`/pacientes/${pacienteSelecionado.id}`)
            .then(() => {
                setPacientes(prevPacientes => prevPacientes.filter(paciente => paciente.id !== pacienteSelecionado.id))
                fecharModal()
                abrirModalSucesso()
            })
            .catch(error => {
                console.error("Ocorreu um erro ao remover o paciente", error)
            })
        }
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Lista de Pacientes</h2>
            <Link to="/add-paciente" className="btn btn-primary mb-2">
                <FaPlus className="icon" /> Adicionar Paciente
            </Link>

            <table className="table">
                <thead>
                    <tr>
                        <th>Nome:</th>
                        <th>CPF:</th>
                        <th>Email:</th>
                        <th>Ações:</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map(paciente => (
                        <tr key={paciente.id}>
                            <td>{paciente.nome}</td>
                            <td>{paciente.cpf}</td>
                            <td>{paciente.email}</td>
                            <td>
                                <Link to={`/edit-paciente/${paciente.id}`} className="btn btn-sm btn-warning">
                                    <FaEdit className="icon icon-btn"/> Editar
                                </Link>
                                <button onClick={() => abrirModal(paciente)} className="btn btn-sm btn-danger">
                                    <FaTrash className="icon icon-btn" /> Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={modalAberto}
                onRequestClose={fecharModal}
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modalContent">
                    <FaExclamationTriangle className="icon" />
                    <h2>Confirmar Exclusão</h2>
                    <p>Tem certeza que deseja excluir o paciente {pacienteSelecionado && pacienteSelecionado.nome}?</p>
                    <div className="modalButtons">
                        <button onClick={fecharModal} className="btn btn-secondary">Cancelar</button>
                        <button onClick={removerPaciente} className="btn btn-danger">Excluir</button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={modalSucessoAberto}
                onRequestClose={() => setModalSucessoAberto(false)}
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modalContent">
                    <FaCheckCircle className="icon successIcon" />
                    <h2>Paciente excluído com sucesso!</h2>
                </div>
            </Modal>
        </div>
    )
}

export default PacienteList

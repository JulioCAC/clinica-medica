import React, { useEffect, useState } from 'react'
import axios from '../../api'
import { Link } from 'react-router-dom'
import { FaPlus, FaEdit, FaTrash, FaExclamationTriangle, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa'
import Modal from 'react-modal'

const MedicoList = () => {

    const [medicos, setMedicos] = useState([]);
    const [medicoSelecionado, setMedicoSelecionado] = useState(null);
    const [modalAberto, setModalAberto] = useState(false)
    const [modalSucessoAberto, setModalSucessoAberto] = useState(false)
    const [tooltipAberto, setTooltipAberto] = useState(false)

    useEffect(() => {
        const buscarMedicos = () => {
            axios.get("/medico")
                .then(response => setMedicos(response.data))
                .catch(error => console.error("Ocorreu um erro", error));
        };
        buscarMedicos();
    }, []);

    const abrirModal = (medico) => {
        setMedicoSelecionado(medico);
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setMedicoSelecionado(null);
    };

    const abrirModalSucesso = () => {
        setModalSucesso(true);
        setTimeout(() => setModalSucesso(false), 1500);
    };

    const removerMedico = () => {
        axios.delete(`/medico/${medicoSelecionado.id}`)
        .then(() => {
            setMedicos(prevMedicos => prevMedicos.filter(medico => medico.id !== medicoSelecionado.id))
            fecharModal()
            abrirModalSucesso()
        })
    }

    const toggleTooltip = () => {
        setTooltipAberto(!tooltipAberto)
    }


  return (
    <div>
         <div className="container mt-5">
        <h2 className="mb-4" style={{ position: 'relative' }}>Lista de Médicos{' '}
        <FaQuestionCircle
            className="tooltip-icon"
            onClick={toggleTooltip} 
        />
        {tooltipAberto && (
            <div className="tooltip">
                Aqui você pode ver, editar ou excluir médicos cadastrados no sistema.
            </div>
        )}
        </h2>
        <Link to="/add-medicos" className="btn btn-primary mb-2">
            <FaPlus className="icon" /> Adicionar Médico
        </Link>
        <table className="table">
            <thead>
                <tr>
                    <th>Nome:</th>
                    <th>CRM:</th>
                    <th>Especialidade:</th>
                    <th>Email:</th>
                    <th>Telefone:</th>
                    <th>Ações: </th>
                </tr>
            </thead>
            <tbody>
                {
                    medicos.map(medico => (
                        <tr key={medico.id}>
                            <td>{medico.nome}</td>
                            <td>{medico.crm}</td>
                            <td>{medico.especialidade}</td>
                            <td>{medico.email}</td>
                            <td>{medico.telefone}</td>
                            <td>
                                <Link to={`/edit-medicos/${medico.id}`} className="btn btn-sm btn-warning">
                                    <FaEdit className="icon icon-btn"/> Editar
                                </Link>
                                <button onClick={() => abrirModal(medico)} className="btn btn-sm btn-danger">
                                    <FaTrash className="icon icon-btn" /> Excluir
                                </button>
                            </td>
                        </tr>
                    ))
                }
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
                <p>Tem certeza que deseja excluir o médico 
                    {medicoSelecionado && medicoSelecionado.nome}?
                </p>
                <div className="modalButtons">
                    <button onClick={fecharModal} className="btn btn-secondary">Cancelar</button>
                    <button onClick={removerMedico} className="btn btn-danger">Excluir</button>
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
                <h2>Médico excluído com sucesso!</h2>
            </div>
        </Modal>
    </div>

    </div>
  )
}

export default MedicoList
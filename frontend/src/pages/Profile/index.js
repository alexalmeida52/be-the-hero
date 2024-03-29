import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import { useHistory } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

/**
 * Component do Perfil
 */
export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(res => {
            console.log(res.data);
            setIncidents(res.data);
        });
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
          await api.delete(`incidents/${id}`, {
              headers: {
                  Authorization: ongId,
              }
          });
          
          setIncidents(incidents.filter(elm => elm.id !== id));
        } catch (error) {
            alert('Erro ao deletar');
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo"/>
                <span>Bem Vinda, {ongName}</span>
                
                <Link className="button" to="/incidents/new">
                    Cadastrar Novo Caso
                </Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}

                
            </ul>
        </div>
    );
}
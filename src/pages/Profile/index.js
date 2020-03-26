import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import './style.css'
// import { Container } from './styles';
import api from '../../service/api'
import { FiPower, FiTrash2 } from 'react-icons/fi'

export default function Profile() {
    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')
    const [incidents, setIncidents] = useState([])
    const history = useHistory()
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(resp => {
            setIncidents(resp.data)
        })
    }, [ongId])

    async function handleDeleteIncidennt(id) {
        try {
            await api.delete(`incidents/${id}`, {headers: {
                Authorization: ongId
            }})

            setIncidents(incidents.filter( incident => incident.id != id))
        } catch (error) {
            alert('Erro ao deletar caso')
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }
    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be the Hero" />
                <span>Bem vindo, {ongName}</span>
                <Link className='button' to='/incident/new' >Cadastrar novo caso</Link>
                <button 
                onClick={handleLogout}
                type='button'>
                    <FiPower size={18} color='#e02041' />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map((incident) => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button 
                        onClick={() => handleDeleteIncidennt(incident.id)}
                        type='button'>
                            <FiTrash2 size={20} color='#aBa8b3' />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

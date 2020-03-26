import React, { useState } from 'react';
import './style.css'
// import { Container } from './styles';
import logo from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../service/api'

export default function Register() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [whatsapp, setWhatsapp] = useState()
    const [city, setCity] = useState()
    const [uf, setUf] = useState()

    const history = useHistory()


    async function handleRegister(e) {
        e.preventDefault();
        const data ={
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try {
            let resp = await api.post('ongs', data)
            alert(`Seu ID de acesso: ${resp.data.id}`)
            history.push('/')
        } catch (error) {
            alert('Erro no cadastro')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="logo" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/register">
                        <FiArrowLeft size={16} color={'#e02041'} />
                            Voltar
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        placeholder="Email"
                        type="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className='input-group' >
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="UF"
                            type="text"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

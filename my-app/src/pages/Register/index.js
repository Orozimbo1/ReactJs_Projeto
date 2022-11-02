import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        let formErrors = false;

        if (nome.length < 3 || nome.length > 255) {
            formErrors = true;

            toast.error('Nome deve ter entre 3 e 255 caracteres.');
        }
        if (!isEmail(email)) {
            formErrors = true;

            toast.error('Email inválido.');
        }
        if (password.length < 6 || password.length > 50) {
            formErrors = true;

            toast.error('Senha deve ter entre 6 e 50 caracteres.');
        }

        if (formErrors) return;

        try {
            const response = await axios.post('/users/', {
                nome,
                password,
                email,
            });

            toast.success('Voçê fez seu cadastro!');
            history.push('/login');
        } catch (e) {
            const status = get(e, 'response.status', 0);
            const errors = get(e, 'response.data.errors', []);

            errors.map((error) => toast.error(error));
        }
    }

    return (
        <Container>
            <h1>Crie sua conta</h1>

            <Form onSubmit={handleSubmit}>
                <label htmlFor="nome">
                    Nome:
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite seu nome"
                    />
                </label>
                <label htmlFor="email">
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                    />
                </label>
                <label htmlFor="password">
                    Senha:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                    />
                </label>

                <button type="submit">Criar minha conta</button>
            </Form>
        </Container>
    );
}

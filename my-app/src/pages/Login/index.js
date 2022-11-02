import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Login() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let formErrors = false;

    async function handleSubmit(e) {
        e.preventDefault();

        if (!isEmail(email)) {
            formErrors = true;

            toast.error('Email inválido.');
        }
        if (password.length < 6 || password.length > 50) {
            formErrors = true;

            toast.error('Senha inválida.');
        }

        if (formErrors) return;

        dispatch(actions.LoginRequest({ email, password }));

        // try {
        //     const response = await axios.post('/tokens/', {
        //         email,
        //         password,
        //     });
        //     toast.success('Voçê logou com sucesso!');
        //     history.push('/');
        // } catch (e) {
        //     const status = get(e, 'response.status', 0);
        //     const errors = get(e, 'response.data.errors', []);

        //     errors.map((error) => toast.error(error));
        // }
    }

    return (
        <Container>
            <h1>Login</h1>

            <Form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </Form>
        </Container>
    );
}

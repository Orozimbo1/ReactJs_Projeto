import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Login(props) {
    const dispatch = useDispatch();

    const prevPath = get(props, 'location.state.prevPath', '/');

    const isLoading = useSelector((state) => state.auth.isLoading);

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

        dispatch(actions.LoginRequest({ email, password, prevPath }));
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />

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

import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { isEmail, isInt } from 'validator';
import { useDispatch } from 'react-redux';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
    const dispatch = useDispatch();

    const id = get(match, 'params.id', '');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [foto, setFoto] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!id) return;

        async function getData() {
            try {
                setIsLoading(true);

                const { data } = await axios.get(`/alunos/${id}`);
                const Foto = get(data, 'Fotos[0].url', '');

                setFoto(Foto);

                setNome(data.nome);
                setSobrenome(data.sobrenome);
                setEmail(data.email);
                setIdade(data.idade);
                setPeso(data.peso);
                setAltura(data.altura);

                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                const status = get(err, 'response.status', 0);
                const errors = get(err, 'response.data.errors', []);

                if (status === 400) {
                    errors.map((error) =>
                        toast.error(error, {
                            toastId: 'customId',
                        })
                    );
                    history.push('/');
                }
            }
        }

        getData();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        let formErros = false;

        if (nome.length < 3 || nome.length > 255) {
            toast.error('O nome precisa ter entre 3 e 255 caracteres.');
            formErros = true;
        }

        if (sobrenome.length < 3 || sobrenome.length > 255) {
            toast.error('O sobrenome precisa ter entre 3 e 255 caracteres.');
            formErros = true;
        }

        if (!isEmail(email)) {
            toast.error('Email inválido ex:"example@example.com".');
            formErros = true;
        }

        if (idade.length == 0) {
            toast.error('O campo idade é obrigatório.');
            formErros = true;
        }

        if (!isInt(String(idade))) {
            toast.error('Idade precisa ser um número inteiro.');
            formErros = true;
        }

        if (peso.length == 0) {
            toast.error('O campo peso é obrigatório.');
            formErros = true;
        }

        if (!Number(peso)) {
            toast.error('Peso precisa ser um número.');
            formErros = true;
        }

        if (altura.length == 0) {
            toast.error('O campo altura é obrigatório.');
            formErros = true;
        }

        if (!Number(altura)) {
            toast.error('Altura precisa ser um número.');
            formErros = true;
        }

        if (formErros) return;

        try {
            setIsLoading(true);
            if (id) {
                await axios.put(`/alunos/${id}`, {
                    nome,
                    sobrenome,
                    email,
                    idade,
                    peso,
                    altura,
                });
                toast.success('Aluno(a) editado(a) com sucesso', {
                    toastId: 'customId',
                });
            } else {
                const { data } = await axios.post(`/alunos`, {
                    nome,
                    sobrenome,
                    email,
                    idade,
                    peso,
                    altura,
                });
                toast.success('Aluno(a) criado(a) com sucesso', {
                    toastId: 'customId',
                });
                history.push(`/aluno/${data.id}/edit`);
            }
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);

            const status = get(err, 'response.status', 0);
            const data = get(err, 'response.data', {});
            const errors = get(data, 'errors', []);

            if (errors.length > 0) {
                errors.map((error) => toast.error(error));
            }

            if (status === 401) {
                dispatch(actions.LoginFailure());
            }
        }
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />

            <Title>{id ? 'Editar aluno' : 'Novo aluno'}</Title>

            {id && (
                <ProfilePicture>
                    {foto ? (
                        <img src={foto} alt={nome} />
                    ) : (
                        <FaUserCircle size={140} />
                    )}
                    <Link to={`/fotos/${nome}`}>
                        <FaEdit size={24} />
                    </Link>
                </ProfilePicture>
            )}

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
                <label htmlFor="sobrenome">
                    Sobrenome:
                    <input
                        type="text"
                        value={sobrenome}
                        onChange={(e) => setSobrenome(e.target.value)}
                        placeholder="Digite seu sobrenome"
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
                <label htmlFor="idade">
                    Idade:
                    <input
                        type="number"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                        placeholder="Digite sua Idade"
                    />
                </label>
                <label htmlFor="peso">
                    Peso:
                    <input
                        type="text"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                        placeholder="Digite seu peso"
                    />
                </label>
                <label htmlFor="altura">
                    Altura:
                    <input
                        type="text"
                        value={altura}
                        onChange={(e) => setAltura(e.target.value)}
                        placeholder="Digite sua altura"
                    />
                </label>

                <button type="submit">Salvar</button>
            </Form>
        </Container>
    );
}

Aluno.propTypes = {
    match: PropTypes.shape({}).isRequired,
};

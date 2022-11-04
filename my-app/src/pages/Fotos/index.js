import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form, Title } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Fotos({ match }) {
    const dispatch = useDispatch();

    const id = get(match, 'params.id', '');

    const [Isloading, setIsLoading] = useState(false);
    const [foto, setFoto] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);

                const { data } = await axios.get(`/alunos/${id}`);
                setFoto(get(data, 'Foto[0].url', ''));

                setIsLoading(false);
            } catch {
                setIsLoading(false);

                toast.error('Houve um erro ao obter a imagem', {
                    toastId: 'customId',
                });
                history.push('/');
            }
        };

        getData();
    }, [id]);

    async function handleChange(e) {
        const foto = e.target.files[0];
        const fotoURL = URL.createObjectURL(foto);

        setFoto(fotoURL);

        const formData = new FormData();
        formData.append('aluno_id', id);
        formData.append('foto', foto);

        try {
            setIsLoading(true);

            await axios.post('/fotos/', formData, {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            });

            toast.success('Foto modificada com sucesso');

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);

            const { status } = get(err, 'response', '');
            toast.error('Erro ao modificar foto');

            if (status === 401) dispatch(actions.LoginFailure());
        }
    }

    return (
        <Container>
            <Loading isLoading={Isloading} />

            <Title>Fotos</Title>

            <Form>
                <label htmlFor="foto">
                    {foto ? <img src={foto} alt="foto" /> : 'Selecionar'}
                    <input type="file" id="foto" onChange={handleChange} />
                </label>
            </Form>
        </Container>
    );
}

Fotos.propTypes = {
    match: PropTypes.shape({}).isRequired,
};

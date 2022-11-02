import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import {
    FaUserCircle,
    FaEdit,
    FaWindowClose,
    FaQuestion,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, ProfilePicture } from './styled';
import axios from '../../services/axios';
import Loading from '../../components/Loading';

export default function Alunos() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const [alunos, setAlunos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const response = await axios.get('/alunos');
            setAlunos(response.data);
            console.log(response.data);
            setIsLoading(false);
        }

        getData();
    }, []);

    function handleDeleteAsk(e) {
        if (!isLoggedIn) {
            toast.error('Voçê precisa fazer login.');
            return;
        }
        e.preventDefault();
        const exclamation = e.currentTarget.nextSibling;
        exclamation.setAttribute('display', 'block');
        e.currentTarget.remove();
    }

    async function handleDelete(e, id, index) {
        try {
            setIsLoading(true);
            await axios.delete(`/alunos/${id}`);
            const novosAlunos = [...alunos];
            novosAlunos.splice(index, 1);
            setAlunos(novosAlunos);
            setIsLoading(false);
        } catch (e) {
            const errors = get(e, 'response.data.errors', []);
            errors.map((error) => toast.error(error));
        }
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />

            <h1>Alunos</h1>

            <AlunoContainer>
                {alunos.map((aluno, index) => (
                    <div key={String(aluno.id)}>
                        <ProfilePicture>
                            {get(aluno, 'Fotos[0].url', false) ? (
                                <img
                                    src={aluno.Fotos[0].url}
                                    alt="Imagem de perfil do usuário"
                                />
                            ) : (
                                <FaUserCircle size={36} />
                            )}
                        </ProfilePicture>
                        <span>{aluno.nome}</span>
                        <span>{aluno.email}</span>

                        <Link to={`/aluno/${aluno.id}/edit`}>
                            <FaEdit size={16} />
                        </Link>
                        <Link
                            onClick={handleDeleteAsk}
                            to={`/aluno/${aluno.id}/delete`}
                        >
                            <FaWindowClose size={16} />
                        </Link>
                        <FaQuestion
                            onClick={(e) => handleDelete(e, aluno.id, index)}
                            size={16}
                            display="none"
                            cursor="pointer"
                        />
                    </div>
                ))}
            </AlunoContainer>
        </Container>
    );
}

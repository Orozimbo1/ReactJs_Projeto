import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, ProfilePicture } from './styled';
import axios from '../../services/axios';

export default function Alunos() {
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        async function getData() {
            const response = await axios.get('/alunos');
            setAlunos(response.data);
            console.log(response.data);
        }

        getData();
    }, []);

    return (
        <Container>
            <h1>Alunos</h1>

            <AlunoContainer>
                {alunos.map((aluno) => (
                    <div key={String(aluno.usuario_id)}>
                        <ProfilePicture>
                            {get(aluno, 'img_perfil_usuario', false) ? (
                                <img
                                    src={aluno.img_perfil_usuario}
                                    alt="Imagem de perfil do usuário"
                                />
                            ) : (
                                <FaUserCircle size={36} />
                            )}
                        </ProfilePicture>
                        <span>{aluno.nome}</span>
                        <span>{aluno.email}</span>

                        <Link to={`/aluno/${aluno.usuario_id}/edit`}>
                            <FaEdit size={16} />
                        </Link>
                        <Link to={`/aluno/${aluno.usuario_id}/edit`}>
                            <FaWindowClose size={16} />
                        </Link>
                    </div>
                ))}
            </AlunoContainer>
        </Container>
    );
}

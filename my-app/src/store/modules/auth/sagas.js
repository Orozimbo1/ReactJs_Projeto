import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* LoginRequest({ payload }) {
    try {
        const response = yield call(axios.post, '/tokens', payload);
        yield put(actions.LoginSucess({ ...response.data }));

        toast.success('Voçê logou com sucesso!');

        axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
        history.push(payload.prevPath);
    } catch (e) {
        yield put(actions.LoginFailure());
        toast.error('Usuário ou senha incorretos.');
    }
}

function* registerRequest({ payload }) {
    const { nome, email, password, id } = payload;

    try {
        if (id) {
            yield call(axios.put, '/users', {
                email,
                nome,
                password: password || undefined,
            });
            toast.success('Conta alterada com sucesso.');
            yield put(actions.registerUpdateSucess({ nome, email, password }));
        } else {
            yield call(axios.post, '/users', {
                email,
                nome,
                password,
            });
            toast.success('Usuario criado com sucesso.');
            yield put(actions.registerCreateSucess({ nome, email, password }));
            history.push('/login');
        }
    } catch (e) {
        const errors = get(e, 'response.data.erros', []);
        const status = get(e, 'response.status', 0);

        if (status === 401) {
            toast.error('Voçê precisa azer login novamente.');
            yield put(actions.LoginFailure());
            return history.push('/login');
        }

        if (errors.length > 0) {
            errors.map((error) => toast.error('error'));
        } else {
            toast.error('Erro desconhecido');
        }

        yield put(actions.registerFailure());
    }
}

function persistRehydrate({ payload }) {
    const token = get(payload, 'auth.token', '');

    if (!token) return;

    axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
    takeLatest(types.LOGIN_REQUEST, LoginRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
    takeLatest(types.REGISTER_REQUEST, registerRequest),
]);

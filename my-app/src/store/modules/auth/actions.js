import * as types from '../types';

export function LoginRequest(payload) {
    return {
        type: types.LOGIN_REQUEST,
        payload,
    };
}

export function LoginSucess(payload) {
    return {
        type: types.LOGIN_SUCESS,
        payload,
    };
}

export function LoginFailure(payload) {
    return {
        type: types.LOGIN_FAILURE,
        payload,
    };
}

export function RegisterRequest(payload) {
    return {
        type: types.REGISTER_REQUEST,
        payload,
    };
}

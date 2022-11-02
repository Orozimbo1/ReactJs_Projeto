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

export function registerUpdateSucess(payload) {
    return {
        type: types.REGISTER_UPDATE_SUCESS,
        payload,
    };
}

export function registerCreateSucess(payload) {
    return {
        type: types.REGISTER_CREATE_SUCESS,
        payload,
    };
}

export function registerRequest(payload) {
    return {
        type: types.REGISTER_REQUEST,
        payload,
    };
}

export function registerFailure(payload) {
    return {
        type: types.REGISTER_FAILURE,
        payload,
    };
}

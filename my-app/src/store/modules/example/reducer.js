import * as types from '../types';

const intialState = {
    botaoClicado: false,
};

export default function (state = intialState, action) {
    switch (action.type) {
        case types.BOTAO_CLICADO_SUCESS: {
            console.log('Deu bom');
            const newState = { ...state };
            newState.botaoClicado = !newState.botaoClicado;
            return newState;
        }

        case types.BOTAO_CLICADO_FAILURE: {
            console.log('Deu ruim');
            return state;
        }

        case types.BOTAO_CLICADO_REQUEST: {
            console.log('Estou fazendo a requsição');
            return state;
        }

        default: {
            return state;
        }
    }
}

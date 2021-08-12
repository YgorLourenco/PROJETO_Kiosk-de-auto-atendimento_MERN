import React, {createContext, useReducer} from 'react'
import { ORDER_SET_TYPE } from './constants'
// Configurando o context da loja do app
export const Store = createContext()

const initialState = {
    order: {
        orderType: 'Comer aqui',
    }
}
// Vai gerenciar as ações e os estados do reducer
function reducer(state, action) {
    switch(action.type) {
        case ORDER_SET_TYPE:
            return{
                ...state,
                order: {...state.order, orderType: action.payload},
            }
        default: 
            return state
    }
}

// Vai prover globalmente as ações do Reducer
export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = {state, dispatch}

    return <Store.Provider value={value}>{props.children}</Store.Provider>
}
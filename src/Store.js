import React, {createContext, useReducer} from 'react'
import { CATEGORY_LIST_FAIL, CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, ORDER_ADD_ITEM, ORDER_CLEAR, ORDER_REMOVE_ITEM, ORDER_SET_TYPE, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from './constants'
// Configurando o context da loja do app
export const Store = createContext()

const initialState = {
    categoryList: {loading: true},
    productList: {loading: true},
    order: {
        orderType: 'Comer aqui',
        orderItems: [],
    }
}
// Vai gerenciar as ações e os estados do reducer
function reducer(state, action) {
    switch(action.type) {
    // Reducer das Categorias
        case CATEGORY_LIST_REQUEST:
            return {...state, categoryList: {loading: true}}
        case CATEGORY_LIST_SUCCESS:
            return {
                    ...state,
                    categoryList: {loading: false, categories: action.payload},
                }
        case CATEGORY_LIST_FAIL:
            return {
                ...state,
                categoryList: {loading: false, error: action.payload},
            }

        // Reducer das Categorias
        case PRODUCT_LIST_REQUEST:
            return {...state, productList: {loading: true}}
        case PRODUCT_LIST_SUCCESS:
            return {
                    ...state,
                    productList: {loading: false, products: action.payload},
                }
        case PRODUCT_LIST_FAIL:
            return {
                ...state,
                productList: {loading: false, error: action.payload},
            }
        // Vai redirecionar para a página de pedidos
        case ORDER_SET_TYPE:
            return{
                ...state,
                order: {...state.order, orderType: action.payload},
            }
        // Vai adicionar um item
        case ORDER_ADD_ITEM: {
            const item = action.payload
            const existItem = state.order.orderItems.find(
                (x) => x.name === item.name
            )
            const orderItems = existItem ? state.order.orderItems.map((x) => 
                x.name === existItem.name ? item : x
            ) : [...state.order.orderItems, item];

            const itemsCount = orderItems.reduce((a, c) => a + c.quantity, 0)
            const itemsPrice = orderItems.reduce(
                (a,c) => a + c.quantity * c.price,
                0
            )
            const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100
            const totalPrice = Math.round((itemsPrice + taxPrice) * 100) / 100

            return {
                ...state,
                order: {
                    ...state.order,
                    orderItems,
                    taxPrice,
                    totalPrice,
                    itemsCount
                }
            }
        }
        // Vai remover um item
        case ORDER_REMOVE_ITEM: {
            const orderItems = state.order.orderItems.filter(
                (x) => x.name !== action.payload.name
            )
            const itemsCount = orderItems.reduce((a, c) => a + c.quantity, 0)
            const itemsPrice = orderItems.reduce(
                (a,c) => a + c.quantity * c.price,
                0
            )
            const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100
            const totalPrice = Math.round((itemsPrice + taxPrice) * 100) / 100
            return {
                ...state,
                order: {
                    ...state.order,
                    orderItems,
                    taxPrice,
                    totalPrice,
                    itemsCount
                }
            }
        }
        // Vai apagar o pedido inteiro
        case ORDER_CLEAR: 
            return {
                ...state,
                order: {
                    orderItems: [],
                    taxPrice: 0,
                    totalPrice: 0,
                    itemsCount: 0,
                }
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
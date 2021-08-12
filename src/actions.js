import { ORDER_SET_TYPE } from "./constants"

// Ação de pedido
export const setOrderType = (dispatch, orderType) => {
    return dispatch({
        type: ORDER_SET_TYPE,
        payload: orderType,
    })
}
import * as actionTypes from '../Redux/Actions'
const Initial_State = {
    cartTotalCount: 0
}
const CartReducer = (state = Initial_State, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_CART_COUNT:
            return {
                cartTotalCount: action.data
            }
        default:
            return { ...state }
    }
}
export default CartReducer
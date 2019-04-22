import * as actionTypes from '../Redux/Actions';
export const updateCount = (totalCount) => {
    return function (dispatch) {
        dispatch({
            type: actionTypes.UPDATE_CART_COUNT,
            data: totalCount
        })
    }
}

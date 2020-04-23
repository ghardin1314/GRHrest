import * as actionTypes from './actionTypes'

export const getAutoResults = (params) => {
    return {
        type: actionTypes.GET_AUTO_RESULTS,
        params: params
    }
}

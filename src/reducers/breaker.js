import { MANAGE_BREAKER_STATE, DISABLE_BUTTONS } from '../actions/manageBreakerState'
import Decoder3VA from '../utils/Decoder3VA';

const initialState = {
    stateClosed: false,
    stateOpened: false,
    stateTripped: false,
    disabledButtons: false
}

export const breakerStateReducer = (state = initialState, action) => {
    let values = Decoder3VA.convertValue(action.state)
    switch (action.type) {
        case MANAGE_BREAKER_STATE:
            return {
                ...state,
                ...values
            }
        case DISABLE_BUTTONS:
            return {
                ...state,
                disabledButtons: action.state
            }
        default:
            return state
    }
}
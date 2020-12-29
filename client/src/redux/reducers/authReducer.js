import ACTIONS from '../actions/'

const initialState = {
    user: [],
    isLogged: false,
    isAdmin: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.LOGIN:
            return {
                ...state,
                isLogged: true
            }
            default:
                return state
    }
}

export default authReducer
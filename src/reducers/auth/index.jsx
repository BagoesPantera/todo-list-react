const initialState = {
    loading: false,
    error: false,
    token: localStorage.getItem('token') || null,
}

const authReducer = (state = initialState, action) => { 
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
                token: action.payload.token,
            }
        case 'REGISTER':
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
            }
        case 'LOGOUT':
            return {
                ...state,
                token: action.payload.token,
            }
        default:
            return state
    }
}

export default authReducer;

const initialState = {
    loading: false,
    error: false,
    token: localStorage.getItem('token') || null,
    userData: false,
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
        case 'USERINFO':
            return {
                ...state,
                userData: action.payload.userData,
            }
        case 'LOGOUT':
            return {
                ...state,
                token: action.payload.token,
            }
        case 'CLEAR_ERROR':
            return {
                ...state,
                loading: false,
                error: false,
            }
        default:
            return state
    }
}

export default authReducer;

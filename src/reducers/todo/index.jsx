const initialState = {
    todos: false,
    loading: false,
    error: false,
    response: null,
    oneTodo: null,
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODO':
            return {
                ...state,
                todos: action.payload.todos,
                loading: action.payload.loading,
                error: action.payload.error,
            }
        case 'GET_ONE_TODO':
            return {
                ...state,
                oneTodo: action.payload.oneTodo,
                loading: action.payload.loading,
                error: action.payload.error,
            }
        case 'ADD_TODO':
            return {
                ...state,
                response: action.payload.response,
                loading: action.payload.loading,
                error: action.payload.error,
            }
        case 'DELETE_TODO':
            return {
                ...state,
                response: action.payload.response,
                loading: action.payload.loading,
                error: action.payload.error,
            }
        case 'UPDATE_TODO':
            return {
                ...state,
                response: action.payload.response,
                loading: action.payload.loading,
                error: action.payload.error,
            }
        case 'CLEAR':
            return {
                ...state,
                response: null,
                loading: false,
                error: false,
                oneTodo: null,
            }
        default:
            return state
    }
}

export default todoReducer;

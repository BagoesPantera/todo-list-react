import apiFetch from "../api/api";

export const getTodo = () => {
    return async (dispatch) => {
        //loading 
        dispatch({
            type: 'GET_TODO',
            payload: {
                loading: true,
                todos: false,
                error: false,
            }
        })

        //GET_TODO
        try {
            const response = await apiFetch("/todo", {
              method: "GET",
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            });
            dispatch({
                type: 'GET_TODO',
                payload: {
                    loading: false,
                    todos: response,
                    error: false,
                }
            })

        } catch (err) {
            dispatch({
                type: 'GET_TODO',
                payload: {
                    loading: false,
                    todos: false,
                    error: err,
                }
            })
        } 
    }
}

export const getOneTodo = (id) => {
    return async (dispatch) => {
        //loading
        dispatch({
            type: 'GET_ONE_TODO',
            payload: {
                loading: true,
                oneTodo: null,
                error: false,
            }
        })

        try {
            const response = await apiFetch(`/todo/${id}`, {
              method: "GET",
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            });
            dispatch({
                type: 'GET_ONE_TODO',
                payload: {
                    loading: false,
                    oneTodo: response,
                    error: false,
                }
            })
          } catch (err) {
            dispatch({
                type: 'GET_ONE_TODO',
                payload: {
                    loading: false,
                    oneTodo: null,
                    error: err,
                }
            })
          }

    }
}

export const addTodo = (title, description) => {
    return async (dispatch) => {
        //loading 
        dispatch({
            type: 'ADD_TODO',
            payload: {
                loading: true,
                error: false,
                response: null,
            }
        })

        //ADD_TODO
        try {
            const response = await apiFetch("/todo/add", {
              method: "POST",
              headers: {
                Authorization: localStorage.getItem("token"),
              },
              body: {
                title,
                description,
              },
            });
            getTodo()(dispatch);
            dispatch({
                type: 'ADD_TODO',
                payload: {
                    loading: false,
                    error: false,
                    response: response.message,
                }
            })
            
        } catch (err) {
            if (typeof err == "object") {
                err = "All field is required.";
            }
            dispatch({
                type: 'ADD_TODO',
                payload: {
                    loading: false,
                    error: err,
                    response: null,
                }
            })
        }
    }
}

export const deleteTodo = (id) => {
    return async (dispatch) => {
        //loading 
        dispatch({
            type: 'DELETE_TODO',
            payload: {
                loading: true,
                error: false,
                response: null,
            }
        })

        //DELETE_TODO
        try {
            const response = await apiFetch(`/todo/delete/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            });
            getTodo()(dispatch);
            dispatch({
                type: 'DELETE_TODO',
                payload: {
                    loading: false,
                    error: false,
                    response: response.message,
                }
            })
          } catch (err) {
            dispatch({
                type: 'DELETE_TODO',
                payload: {
                    loading: false,
                    error: err,
                    response: null,
                }
            })
          }
    }
}

export const updateTodo = (id, title, description) => {
    return async (dispatch) => {
        //loading 
        dispatch({
            type: 'UPDATE_TODO',
            payload: {
                loading: true,
                error: false,
                response: null,
            }
        })

        //UPDATE_TODO
        try {
            const response = await apiFetch(`/todo/update/${id}`, {
              method: "POST",
              headers: {
                Authorization: localStorage.getItem("token"),
              },
              body: {
                title,
                description,
              },
            });
            getTodo()(dispatch);
            dispatch({
                type: 'UPDATE_TODO',
                payload: {
                    loading: false,
                    error: false,
                    response: response.message,
                }
            })
          } catch (err) {
            dispatch({
                type: 'UPDATE_TODO',
                payload: {
                    loading: false,
                    error: err,
                    response: null,
                }
            })
          }
    }
}

export const clearState = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR',
        })
    }
}

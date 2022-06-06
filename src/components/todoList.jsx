import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";

import { getTodo, deleteTodo,  getOneTodo } from "../actions/todoAction";

import { swalConfirmDelete } from "../entities/swal.entity";

export default function TodoList() {

    const { todos } = useSelector(state => state.todo);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getTodo());
    }, [])

    return (
        todos.map((todo) => (
            <div key={todo.id} className="flex mb-4 items-center">
                <div className="flex flex-col">
                    <p className="w-full text-grey-darkest">{todo.title}</p>
                    <p className="w-full text-grey-darkest">{todo.description}</p>
                </div>
                <div className="flex float-right ml-auto">
                    <button className="flex-no-shrink p-2 border-2 rounded hover:text-white text-green border-green-600 hover:bg-green-600" onClick={() => dispatch(getOneTodo(todo.id))}>Edit</button>
                    <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red-600 hover:text-white hover:bg-red-600" onClick={() => swalConfirmDelete(todo.id, dispatch, deleteTodo)}>Remove</button>
                </div>
            </div>
        ))
    )
}
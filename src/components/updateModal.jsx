import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// actions
import { updateTodo, clearState } from "../actions/todoAction";

export default function UpdateModal() {

    const [updateId, setUpdateId] = useState("");
    const [updateTaskTitle, setUpdateTaskTitle] = useState("");
    const [updateTaskDescription, setUpdateTaskDescription] = useState("");

    // reducers state
    const { oneTodo } = useSelector(state => state.todo);

    const dispatch = useDispatch();

    useEffect(() => {
        if(oneTodo){
            setUpdateId(oneTodo.id);
            setUpdateTaskTitle(oneTodo.title);
            setUpdateTaskDescription(oneTodo.description);
        }
    }, [ oneTodo ]);

    const handleUpdateTodo = (e, id) => {
        e.preventDefault();
    
        dispatch(updateTodo(id, updateTaskTitle, updateTaskDescription));
        handleClear();
      }

    const handleClear = () => {
        dispatch(clearState());
        setUpdateId("");
        setUpdateTaskTitle("");
        setUpdateTaskDescription("");
    }

    return (
        <><div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Edit Todo List
                        </h3>
                    </div>
                    {/*body*/}
                    <form className="flex mt-4 flex-col " onSubmit={e => handleUpdateTodo(e, updateId)}>
                        <div className="relative p-6 ">

                            <input className="shadow appearance-none border rounded w-full py-s2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" value={updateTaskTitle} onChange={e => setUpdateTaskTitle(e.target.value)} />
                            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 mt-3 text-grey-darker" name="" id="" cols="20" rows="4" placeholder="Description" value={updateTaskDescription} onChange={e => setUpdateTaskDescription(e.target.value)} />

                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => handleClear()}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div></>
    )
}
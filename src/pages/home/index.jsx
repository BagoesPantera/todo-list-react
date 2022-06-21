import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// actions
import { addTodo } from "../../actions/todoAction";
import { logout } from "../../actions/authAction";

// components
import TodoList from "../../components/todoList";
import UpdateModal from "../../components/updateModal";

// entities
import { swalLoading, swalAlert, swalClose } from "../../entities/swal.entity";

export default function Home() {

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [count , setCount] = useState(0);

  // reducers state
  const { response, error, oneTodo, loading } = useSelector(state => state.todo);

  const dispatch = useDispatch();

  useEffect(() => {

    oneTodo ? setShowModal(true) : setShowModal(false);
    loading ? swalLoading() : swalClose();
    
    if(response) {
      swalAlert("info", response, dispatch)
      handleClear();  
    }

    if(error) {
      swalAlert("error", error, dispatch)
      handleClear();
    }

  }, [response, error, oneTodo, loading]);

  const handleAddTodo = (e) => {
    e.preventDefault();

    dispatch(addTodo(newTaskTitle, newTaskDescription));
  }

  const handleClear = () => {
    setNewTaskTitle("");
    setNewTaskDescription("");
    setCount(0);
    setShowModal(false);
  }

  return (
    <div className="h-100 w-full flex flex-col h-screen overflow-y-auto bg-white lg:bg-gradient-to-tr from-slate-300 via-slate-200 to-slate-300 items-center font-sans">
      <div className="bg-white rounded p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          {/* head */}
          <div className="grid grid-cols-2">
            <div className="">
              <h1 className="text-grey-darkest font-bold">Todo List</h1>
            </div>
            <div className="">
              <div className="flex lg:absolute lg:top-2 lg:right-10 h-fit w-200">
                <button className="bg-red-500 hover:bg-red-700 ml-auto text-white font-bold py-2 px-4 rounded" onClick={() => dispatch(logout())}>
                  Logout
                </button>
              </div>
            </div>
          </div>
          
          <form className="flex mt-4 flex-col" onSubmit={e => handleAddTodo(e)}>
              <input className="shadow appearance-none border border-solid border-gray-300 rounded w-full py-2 px-3 mr-4 text-grey-darker focus:border-gray-600 focus:ring-0" placeholder="Add Todo" value={newTaskTitle} onChange={e => setNewTaskTitle( e.target.value)}/>
              <textarea className="form-control shadow block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out mt-3 border-transparent focus:text-gray-700 focus:bg-white focus:border-gray-900 focus:ring-0" name="" id="" cols="20" rows="4" maxLength="255" placeholder="Description" value={newTaskDescription} onChange={e => {setNewTaskDescription(e.target.value); setCount(e.target.value.length)}} required/>
              <p className="text-right">{count}/255</p>
              <button type="submit" className="flex-no-shrink p-2 w-full mt-3 border-2 mr-4 rounded text-teal border-teal-600 hover:text-white hover:bg-teal-600">Add</button>
          </form>
        </div>

        {/* TODOLIST */}
        <h1 className="text-grey-darkest font-bold">Upcoming</h1>
        <div className="divide-y mt-4">
          <TodoList />
        </div>
        {showModal ? <UpdateModal /> : null}
      </div>
      
    </div>
  );
}
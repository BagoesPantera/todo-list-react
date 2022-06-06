import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// actions
import { addTodo, clearState } from "../../actions/todoAction";
import { logout } from "../../actions/authAction";

// components
import TodoList from "../../components/todoList";
import UpdateModal from "../../components/updateModal";

export default function Home() {

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  // reducers state
  const { token } = useSelector(state => state.auth);
  const { response, error, oneTodo } = useSelector(state => state.todo);

  const dispatch = useDispatch();

  useEffect(() => {

    if(oneTodo){
      setShowModal(true);
    }

    if(response) {
      handleClear();

      // adding this causing "Should not already be working." error.
      //alert(response)
    }

    if(error) {
      alert(error);
    }

  }, [token, response, error, oneTodo]);

  const handleAddTodo = (e) => {
    e.preventDefault();

    dispatch(addTodo(newTaskTitle, newTaskDescription));
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleClear = () => {
    setNewTaskTitle("");
    setNewTaskDescription("");
    setShowModal(false);
    dispatch(clearState());
  }

  return (
    <div className="h-100 w-full flex flex-col h-screen items-center bg-white font-sans">
      <div className="bg-white rounded p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
          <form className="flex mt-4 flex-col" onSubmit={e => handleAddTodo(e)}>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" value={newTaskTitle} onChange={e => setNewTaskTitle( e.target.value)}/>
              <textarea className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 mt-3 text-grey-darker" name="" id="" cols="20" rows="4" placeholder="Description" value={newTaskDescription} onChange={e => setNewTaskDescription(e.target.value)}/>
              <button type="submit" className="flex-no-shrink p-2 w-full mt-3 border-2 mr-4 rounded text-teal border-teal-600 hover:text-white hover:bg-teal-600">Add</button>
          </form>
        </div>

        {/* TODOLIST */}
        <h1 className="text-grey-darkest">Upcoming</h1>
        <div className="divide-y mt-4">
          <TodoList></TodoList>
        </div>
        {showModal ? UpdateModal : null}
      </div>
      <div className="absolute top-2 right-2 h-16 w-200">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    </div>
  );
}
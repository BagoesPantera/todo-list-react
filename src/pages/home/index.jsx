import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TrashIcon, PencilIcon, LogoutIcon } from "@heroicons/react/solid";
import apiFetch from "../../api/api";

export default function Home() {
  
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [showModal, setShowModal] = useState(false);

  async function displayTodo() {
    try {
      const response = await apiFetch("/todo", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setTasks(response);
    } catch (error) {
      console.log(error);
    }   
  }
// displayTodo();
  useEffect(() => {

    displayTodo();

  }, []);

  async function addTodo(e) {
    e.preventDefault();
    console.log("masuk");
    try {
      const response = await apiFetch("/todo/add", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: {
          title: newTaskTitle,
          description: newTaskDescription,
        },
      });
      console.log(response);
      setNewTaskTitle("");
      setNewTaskDescription("");
      displayTodo();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTodo(id) {
    try {
      const response = await apiFetch(`/todo/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      displayTodo();
    } catch (error) {
      console.log(error);
    }
  }

//console.log(tasks);


  return (
    <div className="h-100 w-full flex flex-col h-screen items-center bg-neutral-100 font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            <div className="mb-4">
                <h1 className="text-grey-darkest">Todo List</h1>
                <form className="flex mt-4 flex-col" onSubmit={e => addTodo(e)}>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" value={newTaskTitle} onChange={e => setNewTaskTitle( e.target.value)}/>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 mt-3 text-grey-darker" name="" id="" cols="20" rows="4" placeholder="Description" value={newTaskDescription} onChange={e => setNewTaskDescription(e.target.value)}/>
                    
                    <button type="submit" className="flex-no-shrink p-2 w-full mt-3 border-2 mr-4 rounded text-teal border-teal-600 hover:text-white hover:bg-teal-600">Add</button>
                </form>
            </div>
            <h1 className="text-grey-darkest">Upcoming</h1>
            <div className="divide-y mt-4">
              {/* start */}
              {tasks.map((task) => (
                <div key={task.id} className="flex mb-4 items-center">
                  <div className="flex flex-col">
                     <p className="w-full text-grey-darkest">{task.title}</p>
                    <p className="w-full text-grey-darkest">{task.description}</p>
                  </div>
                   
                    <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green-600 hover:bg-green-600" onClick={() => setShowModal(true)}>Edit</button>
                    <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red-600 hover:text-white hover:bg-red-600" onClick={() => deleteTodo(task.id)}>Remove</button>
                </div>
                ))}
                {/* end */}
            </div>

            {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Edit Todo List
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 ">
                  <form className="flex mt-4 flex-col ">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" value={newTaskTitle} onChange={e => setNewTaskTitle( e.target.value)}/>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 mt-3 text-grey-darker" name="" id="" cols="20" rows="4" placeholder="Description" value={newTaskDescription} onChange={e => setNewTaskDescription(e.target.value)}/>
                    
                    <button type="submit" className="flex-no-shrink p-2 w-full mt-3 border-2 mr-4 rounded text-teal border-teal-600 hover:text-white hover:bg-teal-600">Add</button>
                </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      
        </div>
    </div>
  );
}
import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import App from './App'
import './index.css'

//route
const Home = React.lazy(() => import("./pages/home"));
const Login = React.lazy(() => import("./pages/login"));
const Register = React.lazy(() => import("./pages/register"));

// const displayTodo = async () => {
//   try {
//     const response = await apiFetch("/todo", {
//       method: "GET",
//       headers: {
//         Authorization: localStorage.getItem("token"),
//       },
//     });
//     setTasks(response);
//     //console.log(response);
//   } catch (error) {
//     console.log(error);
//   }   }

  // https://17.reactjs.org/docs/concurrent-mode-suspense.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ 
        (localStorage.getItem("token") != null) ? 
        ( <React.Suspense fallback={<>...</>}>
          <Home />
        </React.Suspense> ) : (<Navigate to="/login" replace />)
      }  >
      </Route>
      <Route path="/login" element={
        <React.Suspense fallback={<>...</>}>
          <Login />
        </React.Suspense>} >
      </Route>
      <Route path="/register" element={
        <React.Suspense fallback={<>...</>}>
          <Register />
        </React.Suspense>}>
      </Route>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
)

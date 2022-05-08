import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import App from './App'
import './index.css'

//route
const Home = React.lazy(() => import("./pages/home"));
const Login = React.lazy(() => import("./pages/login"));
const Register = React.lazy(() => import("./pages/register"));

function isLoggedIn(){
  return localStorage.getItem("token") != null
}

// fallback doc : https://17.reactjs.org/docs/concurrent-mode-suspense.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ 
          (localStorage.getItem("token") != null) ?
          ( <React.Suspense fallback={<>...</>}>
            <Home />
          </React.Suspense> ) : (<Navigate to="/login" />)
        }  >
        </Route>
        <Route path="/login" element={
          (localStorage.getItem("token") == null) ?
          ( <React.Suspense fallback={<>...</>}>
            <Login />
          </React.Suspense> ) : (<Navigate to="/" />)
        } > 
        </Route>
        <Route path="/register" element={
          (localStorage.getItem("token") == null) ?
          ( <React.Suspense fallback={<>...</>}>
            <Register />
          </React.Suspense> ) : (<Navigate to="/" />)}>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)


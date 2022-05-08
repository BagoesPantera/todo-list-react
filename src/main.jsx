import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import App from './App'
import './index.css'

//route
const Home = React.lazy(() => import("./pages/home"));
const Login = React.lazy(() => import("./pages/login"));
const Register = React.lazy(() => import("./pages/register"));

function auth(){
  return localStorage.getItem("token") != null;
}

// fallback doc : https://17.reactjs.org/docs/concurrent-mode-suspense.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ 
          (auth) ? 
          ( <React.Suspense fallback={<>...</>}>
            <Home />
          </React.Suspense> ) : (<Navigate to="/login" replace />)
        }  >
        </Route>
        <Route path="/login" element={
          (!auth) ?
          ( <React.Suspense fallback={<>...</>}>
            <Login />
          </React.Suspense> ) : (<Navigate to="/" replace />)
        } > 
        </Route>
        <Route path="/register" element={
          (!auth) ?
          ( <React.Suspense fallback={<>...</>}>
            <Register />
          </React.Suspense> ) : (<Navigate to="/" replace />)}>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

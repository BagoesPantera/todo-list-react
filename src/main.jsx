import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css'
import "sweetalert2/dist/sweetalert2.min.css";

//middleware
import { ProtectedLogin, ProtectedRoute } from './ProtectedRoute';

// components
import { loading } from './components/loading';

// redux
import { Provider } from 'react-redux';
import store from './reducers'

//route
const Home = React.lazy(() => import("./pages/home"));
const Login = React.lazy(() => import("./pages/login"));
const Register = React.lazy(() => import("./pages/register"));

// fallback doc : https://17.reactjs.org/docs/concurrent-mode-suspense.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/todo-list-react/'>
     <Provider store={ store }>
          <Routes>
            <Route path="/" element={ 
              <ProtectedRoute>
                <React.Suspense fallback={loading()}>
                  <Home />
                </React.Suspense>     
              </ProtectedRoute>
            }  >
            </Route>
            <Route path="/login" element={
              <ProtectedLogin>
                <React.Suspense fallback={loading()}>
                  <Login />
                </React.Suspense>
              </ProtectedLogin>
              
            } > 
            </Route>
            <Route path="/register" element={
              <ProtectedLogin>
                <React.Suspense fallback={loading()}>
                  <Register />
                </React.Suspense>
              </ProtectedLogin>
              } >
            </Route>
          </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)

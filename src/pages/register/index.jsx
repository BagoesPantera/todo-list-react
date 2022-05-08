import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiFetch from "../../api/api";

export default function Login() {

    const navigate = useNavigate();

    const [nameData, setNameData] = useState("");
    const [emailData, setEmailData] = useState("");
    const [passwordData, setPasswordData] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await apiFetch("/auth/login", {
                method: "POST",
                body: {
                    email: emailData,
                    password: passwordData,
                },
            });
            localStorage.setItem("token", response.token);
            setLoading(false);
            window.location.href = "/";
        } catch (error) {
            setLoading(false);
            setError("Invalid email or password");
        }
    }

    async function handleRegister(e) {
        e.preventDefault();
        setLoading(true);
        if(passwordData === confirmPassword){
            try {
                const response = await apiFetch("/auth/register", {
                    method: "POST",
                    body: {
                        name: nameData,
                        email: emailData,
                        password: passwordData,
                    },
                });
                handleLogin(e);
            } catch (err) {
                console.log(err);
                setLoading(false);
                setError("Try Again");
            }
        }else {
            setLoading(false);
            setError("Passwords do not match");
            alert(error);
        }
    }

    

    return (
        <div className="flex flex-col h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-8">
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up to your account</h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Or
        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500"> sign in to your account</Link>
      </p>
    </div>
    <form className="mt-8 space-y-6" onSubmit={e => handleRegister(e)}>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm -space-y-px">
      <div>
          <label htmlFor="username" className="sr-only">Email address</label>
          <input id="username" name="email" type="text" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" value={nameData} onChange={e => setNameData(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email-address" className="sr-only">Email address</label>
          <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={emailData} onChange={e => setEmailData(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={passwordData} onChange={e => setPasswordData(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Confirm Password</label>
          <input id="confirmPassword" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
        </div>
      </div>

      <div>
        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </span>
          Sign up
        </button>
      </div>
    </form>
  </div>
</div>
);}
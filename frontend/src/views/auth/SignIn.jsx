import React, { useState } from "react";
import axios from "axios";
import Checkbox from "components/checkbox";
import { useNavigate } from "react-router-dom"; 
import { useStores } from "stores/StoreProvider";
import { observer } from "mobx-react-lite";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); 
  const { profileStore } = useStores();
  const navigate = useNavigate(); 

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Submitting form with:", { email, password });

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/superadmins/login`,
        { email, password }
      );
      console.log("Response:", response);

      if (response.data && response.data.token) {
        const expiration = keepLoggedIn
          ? 30 * 24 * 60 * 60 * 1000
          : 24 * 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + expiration);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("tokenExpiry", expiryDate.toISOString());

        if (response.data.user) {
          const { fullname, email, id, role } = response.data.user;
          profileStore.updateProfile(response.data.user);
          if (role) {
            localStorage.setItem("fullname", fullname || "");
            localStorage.setItem("email", email || "");
            localStorage.setItem("id", id || "");
            localStorage.setItem("role", role || "");

            if (role !== "user") {
              navigate("/admin/profile"); 
            } else {
              navigate("/user/profile"); 
            }

            window.location.reload(); 
                    } else {
            console.error("Role is missing in user data");
          }
        } else {
          console.error("User data is missing");
        }
      }
    } catch (err) {
      console.error("Error:", err);

      if (err.response) {
        const { status, data } = err.response;

        if (status === 404) {
          setError("Invalid email or password");
        } else if (status === 500) {
          setError("Internal server error. Please try again later.");
        } else if (data && data.message) {
          setError(data.message);
        } else {
          setError("Something went wrong. Please try again later.");
        }
      } else {
        setError("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/auth/forgot-password");
  };

  return (
<div  className="mt-0 mb-0 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-5">
<div className="rounded border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-navy-900 flex-col flex h-full items-center justify-between sm:px-4">    
      <div  className="m-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-5 text-4xl font-bold flex justify-center text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-3 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>
        <form onSubmit={handleSignIn}>
          
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Email*
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@simmmple.com"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-white"
            >
              Password*
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

   
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="flex items-center">
              <Checkbox
                checked={keepLoggedIn}
                onChange={() => setKeepLoggedIn(!keepLoggedIn)}
              />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <button
              type="button"
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>
      </div>
    </div>
   </div>
  );
}
export default observer(SignIn);

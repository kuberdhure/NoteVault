"use client";
import React, { useEffect } from "react";
import reading from "/public/reading.json";
import { useRouter, redirect } from "next/navigation";
import Lottie from "lottie-react";
import { useState } from "react";
import authService from "../../appwrite/auth";


const LoginPage = () => {

  // const [password, setPassword] = useState("");
  // const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  // const router = useRouter();
  // const [session, setSession] = useState("");
  // const auth = authService;
  // const handleLogin = async () => {

  //   setSession(auth.login({ email: username, password: password }))

  //   const promise = auth.getCurrentUser();

  //   promise.then(
  //     function (response) {
  //       setUserLoggedIn((prev) => !prev)
  //       console.log("User", response);
  //       // Success
  //     },
  //     function (error) {
  //       console.log(error); // Failure
  //       localStorage.setItem("user_login", false)
  //     }
  //   );

  //   isUserLoggedIn ? (login.then(
  //     (response) => {
  //       console.log("success", response);
  //       localStorage.setItem("user_login", true)
  //       // setLoggedIn((prev)=>!prev);
  //       router.push('/')
  //     },
  //     (error) => {
  //       console.log("err", error);
  //       localStorage.setItem("user_login", false)
  //     }
  //   )) : (alert("user already logged in!"), router.push("/"))

  // };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const router = useRouter();
  const auth = authService;

  const handleLogin = async () => {
    try {
      // Send login request to Appwrite
      // const session = await auth.login({ email: username, password: password });

      // If login successful, update state and route to '/'
      setUserLoggedIn(true);
      localStorage.setItem("user_login", true);

      const promise = authService.account.createJWT();

      promise.then(
        function (response) {
          sessionStorage.setItem("JWT_Token","")
          sessionStorage.setItem("JWT_Token",response.jwt)
          console.log("JWT",response); // Success
        },
        function (error) {
          console.log(error); // Failure
        }
      );
      // redirect("https://localhost:3000/")
      router.push("/");
    } catch (error) {
      // If login fails, log error and update state
      console.log("Error logging in:", error);
      setUserLoggedIn(false);
      localStorage.setItem("user_login", false);
      // Optionally, display an error message to the user
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  // Redirect to home if user is already logged in

  useEffect(() => {
    if (isUserLoggedIn) {
      router.push("/");

      // redirect('/')

      return null;
    }
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-5xl  py-12 md:py-24">
          <div className="w-full flex flex-row justify-center align-middle text-center text-2xl font-bold text-gray-900 md:text-4xl">
            NoteVault
          </div>
          <div className="grid items-center justify-items-center gap-y-10 lg:grid-cols-2 shadow-xl h-2/3">
            <div className="flex items-center justify-center ">
              <div className="px-2 md:px-12 ">
                <p className="text-2xl font-bold text-gray-900 md:text-4xl text-center">
                  Login
                </p>
                <form action="" className="mt-8 space-y-4 w-full">
                  <div className="grid w-full  items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="user_name"
                    >
                      Username
                    </label>
                    <input
                      className="border-2 border-black placeholder:text-gray-400 mt-2 mr-2 mb-2 p-2 rounded-md"
                      type="text"
                      id="user_name"
                      value={username}
                      placeholder="Username"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>

                  <div className="grid w-full  items-center gap-1.5">
                    <label
                      className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="email"
                    >
                      Password
                    </label>
                    <input
                      className="border-2 border-black placeholder:text-gray-400 mt-2 mr-2 mb-2 p-2 rounded-md"
                      type="password"
                      value={password}
                      id="email"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLogin()}
                    className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
            {/* <img
                            alt="Login"
                            className="hidden max-h-full w-full rounded-lg object-cover lg:block"
                            src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGhhcHB5JTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                        /> */}
            <Lottie animationData={reading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

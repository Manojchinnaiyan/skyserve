"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { SIGNUP_URL } from "../../config/constants";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

const Signup = () => {
  const router = useRouter();
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    error: false,
    errorMsg: "",
  });

  const onInputChange = (e) => {
    setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (signupDetails.password !== signupDetails.confirmPassword) {
      setError({ error: true, errorMsg: "Password didnt match" });
      return;
    }
    axios
      .post(SIGNUP_URL, signupDetails)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        router.push("/");
      })
      .catch((err) =>
        setError({ error: true, errorMsg: err.response.data.error })
      );
  };

  return (
    <div>
      <Navbar />
      <div className="p-20 flex justify-center items-center  ">
        <form onSubmit={handleSubmit}>
          <div className="block justify-center items-center bg-gray-500 p-16 rounded-md space-y-10">
            <div className="text-center text-[25px]">Sign up</div>
            <div>
              <label className="font-bold">Email</label>
              <input
                value={signupDetails.email}
                name="email"
                className="ml-10 rounded-md h-10 w-56  bg-black p-1 border-none float-right"
                type="text"
                onChange={onInputChange}
              />
            </div>
            <div>
              <label className="font-bold">Password</label>
              <input
                value={signupDetails.password}
                name="password"
                type="password"
                className="ml-10 h-10 w-56 rounded-md bg-black border-none float-right"
                onChange={onInputChange}
              />
            </div>
            <div>
              <label className="font-bold">Confirm Password</label>
              <input
                value={signupDetails.confirmPassword}
                name="confirmPassword"
                type="password"
                className="ml-10 h-10 w-56 rounded-md bg-black border-none"
                onChange={onInputChange}
              />
            </div>
            <div>
              <button type="submit" className="p-3 rounded-md bg-black w-full ">
                Submit
              </button>
              <div className="text-red-900 mt-2">
                Create an account ?
                <Link href="/signin" className="underline">
                  {" "}
                  Singin
                </Link>
              </div>
            </div>
          </div>
          {error.error && (
            <div className="p-5 bg-red-700 ">{error.errorMsg}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;

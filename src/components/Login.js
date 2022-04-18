import React from "react";

const Login = ({ toggleLogin }) => {
  return (
    <div className="absolute  z-50 bg-white w-full h-full flex justify-center items-center">
      <div>
        <h1 className="text-center text-5xl font-bold p-6">Kite</h1>
        <p className="text-center text-xl font-semibold pb-6">Please sign in</p>
        <p className="text-lg font-medium pb-1">Username or Email</p>
        <input
          className="p-1 mb-2 border-2 rounded-md"
          type="text"
          placeholder="Enter username or email..."
        />
        <p className="text-lg font-medium pb-1">Password</p>
        <input
          className="p-1 mb-2 border-2 rounded-md"
          type="password"
          placeholder="Enter password..."
        />
        <br />
        <div className="flex justify-center items-center p-2">
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-5 border border-blue-500 hover:border-transparent rounded relative "
            onClick={() => {
              toggleLogin(1);
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

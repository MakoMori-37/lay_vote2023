import React, { useState } from "react";

const Login = ({ signIn = () => {} }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex justify-center items-center h-screen w-full bg__homepage">
      <div className="w-[450px] h-96 rounded-lg bg-opacity-70 backdrop-filter backdrop-blur-md bg-white p-10 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <div
          //   onSubmit={() => signIn(username, password)}
          className="flex flex-col w-full "
        >
          <input
            className="p-2 rounded-lg border border-gray-300 mb-4"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="p-2 rounded-lg border border-gray-300 mb-4"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
            onClick={() => signIn(username, password)}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

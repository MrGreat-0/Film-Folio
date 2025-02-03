import React, { useState } from "react";

const SignInSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || (isSignUp && !formData.name)) {
      alert("Please fill in all required fields.");
      return;
    }
    if (isSignUp && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="w-full min-h-[90vh] flex flex-col items-center justify-center px-4 py-10">
      <div className="shadow-lg shadow-zinc-400 rounded-lg p-8 w-full max-w-md transition-all duration-300">
        <h1 className="text-4xl font-bold mb-4 text-center ">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          {isSignUp
            ? "Create an account to get started!"
            : "Welcome back! Please enter your credentials to sign in."}
        </p>

        <p className="text-red-600 text-xs mb-4 text-center">
          Note: This is a demo form and does not process real credentials.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 border rounded text-zinc-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border rounded text-zinc-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Your Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 border rounded text-zinc-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full p-2 border rounded text-zinc-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
            </div>
          )}
          <button
            type="submit"
            disabled={
              !formData.email ||
              !formData.password ||
              (isSignUp && !formData.name)
            }
            className={`w-full ${
              !formData.email ||
              !formData.password ||
              (isSignUp && !formData.name)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded transition-all duration-300`}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="text-xs text-gray-600 mt-4 text-center">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 font-semibold hover:underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInSignUp;

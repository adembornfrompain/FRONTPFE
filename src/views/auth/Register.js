import React, { useState } from "react";
import { addUser } from "services/ApiUser"; // Update path as needed


export default function Register() {
  // Initialize user state with empty object
  const [user, setUser] = useState({
    name: "",
    last: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  // Add these missing state declarations
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Basic validation
      if (!user.name || !user.email || !user.password) {
        setError("Please fill in all required fields");
        return;
      }

      if (user.password !== user.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (!agreeToTerms) {
        setError("Please agree to the Privacy Policy");
        return;
      }

      setLoading(true);
      
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = user;
      await addUser(userData);
      
      // Success handling
      alert("Registration successful!");
      
      // Reset form
      setUser({
        name: "",
        last: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        role: "client"
      });
      setAgreeToTerms(false);
      
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="px-12 ml-1">
        <div className="ml-14 flex content-center items-center justify-center h-full">
          <div className="px-16 w-full lg:w-8/12">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <div className="rounded-t mb-0 px-6 py-6">
                <div className=" text-center mb-3">
                  <h3 className="text-deep-navy-blue  text-4xl font-semibold py-3">
                    Join Beta Shipping
                  </h3>
                  <div className="text-lightBlue-600 text-lg font-semibold">
                    -Your Gateway for Logistics Excellence- 
                  </div>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                  variant="outline"
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-black  mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/github.svg").default}
                    />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/google.svg").default}
                    />
                    Google
                  </button>
                  
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-trueGray-500 text-center mb-3 font-semibold">
                  Create your professional account for advanced document management
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="flex">
                    {/* First Name Input */}
                    <div className="w-1/2 inline-block ">
                      <label
                        className="flex text-sky-blue  text-sm font-bold mb-2 "
                        htmlFor="name"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="border-0 mr-2 py-3 mb-3 placeholder-blueGray-300 text-blueGray-600 bg-lightBlue-50 rounded text-base shadow w-full ease-linear transition-all duration-150"
                        placeholder="First Name"
                        required
                      />
                    </div>

                    {/* Last Name Input */}
                    <div className="w-1/2 inline-block mx-4">
                      <label
                        className="flex text-sky-blue text-sm font-bold mb-2 "
                        htmlFor="last"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last"
                        value={user.last}
                        onChange={handleChange}
                        className="border-0 mr-2 py-3 mb-3 placeholder-blueGray-300 text-blueGray-600 bg-lightBlue-50 rounded text-base shadow w-full ease-linear transition-all duration-150"
                        placeholder="Last Name"
                      />
                    </div>
                  </div>
                  <div className="flex">

                    <div className="w-1/2 inline-block pr-4">
                      <label
                        className="block uppercase text-sky-blue text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        className="border-0  px-2 py-3 mb-3 placeholder-blueGray-300 text-blueGray-600 bg-lightBlue-50 rounded text-base shadow w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                        required
                      />
                    </div>
                     {/* Phone Input - NEW */}
                  <div className="w-1/2 inline-block ">
                    <label
                      className="flex uppercase text-sky-blue text-xs font-bold mb-2"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 mb-3 placeholder-blueGray-300 text-blueGray-600 bg-lightBlue-50 rounded text-base shadow w-full ease-linear transition-all duration-150"
                      placeholder="Phone Number"
                    />
                  </div>
                  </div>

                    

                 

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-sky-blue text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-lightBlue-50 rounded text-sm shadow focus:outline-none focus:ring focus:ring-lightBlue-500 w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-sky-blue text-xs font-bold mb-2"
                      htmlFor="confirmPassword"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={user.confirmPassword}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-lightBlue-50 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Confirm Password"
                      required
                    />
                  </div> {/* Phone Input - NEW */}
                  

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 disabled:opacity-50"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

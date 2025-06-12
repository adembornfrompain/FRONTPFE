import React, { useState } from "react";
import "assets/styles/tailwind.css";
import { requestQuote } from "services/ApiQuote";
 


export default function ClientRequest() {
  const [activeTab, setActiveTab] = useState("shipment");

  const [formData, setFormData] = useState({
    origin: "",
    destination:"",
    mode: "",
    readyDate: "",
    reqDelivery: "",
    incoterm: "",
    container:"",

    length: 0,
    width: 0,
    height: 0,

    volume: 0,
    weight: 0,
    serviceLevel: "",
  });

    

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const allValuesNotEmpty = (obj) => {
    return Object.values(obj).every(
      (value) =>
        value !== null && value !== undefined && value !== "" && value !== 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (allValuesNotEmpty(formData)) {
      console.log(formData)

      requestQuote(formData)
        .then((response) => {
          alert("Quote requested successfully!");
          
          // Optionally, reset the form or redirect
          setFormData({
            origin: "",
            destination:"",
            mode: "",
            readyDate: "",
            reqDelivery: "",
            incoterm: "",
            container: "",
            serviceLevel: "",
            length: 0,
            width: 0,
            height: 0,
            volume: 0,
            weight: 0,
          });
        })
        .catch((error) => {
          console.error("Error requesting quote:", error);
          alert("Failed to request quote. Please try again.");
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="px-4 md:px-10">
        <div className="relative mr-4 mt-48  pr-5 w-full">
          <div className="bg-blueGray-400 rounded-lg  shadow-lg border-3   ">
            <h1 className="text-3xl text-emerald-500 mt-3 text-center font-bold mb-2">
              Request a Quote !
            </h1>
            <p className="text-gray-600 mb-6  text-center">
              Get instant pricing for your freight shipment. Fill out the
              details below and we'll provide you with competitive rates.
            </p>

            {/* Tabs Navigation */}
            <div className="flex justify-center ml-3 mr-3">
              <nav className="flex w-full max-w-2xl mx-auto rounded-lg overflow-hidden border-3 border-gray-200">
                {[
                  { tab: "shipment", label: "Shipment Details" },
                  { tab: "cargo", label: "Cargo Information" },
                  { tab: "preferences", label: "Preferences" },
                ].map(({ tab, label }, idx, arr) => (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 border-2 py-2 text-sm font-medium capitalize transition-all duration-200 focus:outline-none
                    ${
                      activeTab === tab
                        ? "bg-white text-black border-b-2 border-blue-600 rounded-lg"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200 border-b-2 border-transparent"
                    }
                    ${idx === 0 ? "rounded-l-lg" : ""}
                    ${idx === arr.length - 1 ? "rounded-r-lg" : ""}
                  `}
                    style={{
                      borderRight:
                        idx < arr.length - 1 ? "1px solid #e5e7eb" : "none",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Shipment Details Tab */}
            {activeTab === "shipment" && (
              <div className="space-y-6 mb-4   ">
                <div className="grid  mb-3  grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="mt-3 ml-3 mr-3">
                    <label className="block  text-sm font-medium text-gray-700">
                      Origin Port
                    </label>
                    <input
                      name="origin"
                      type="text"
                      placeholder="Enter origin port"
                      className="mt-1   rounded-lg  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
                      value={formData.origin}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mt-3 ml-3 mr-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Destination Port
                    </label>
                    <input
                      name="destination"
                      type="text"
                      placeholder="Enter destination port"
                      className="mt-1 block w-full  rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={formData.destination}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className=" mt-3 ml-3 mr-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Shipping Mode
                    </label>
                    <select
                      name="mode"
                      className="mt-1 block w-full rounded-lg mr-3 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={formData.mode}
                      onChange={handleInputChange}
                    >
                      <option>Select mode</option>
                      <option>Sea Freight</option>
                      <option>Air Freight</option>
                      <option>Land Freight</option>
                    </select>
                  </div>
                  <div className="flex flex-wrap justify-center mt-2 ml-2 mr-2">
                    <div className="w-1/2 ">
                      <label className="inline-flex text-sm font-medium text-gray-700">
                        Ready Date
                      </label>
                      <input
                        name="readyDate"
                        type="date"
                        className="mt-1 block w-full rounded-lg border border-3  shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.readyDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className=" ml-1  w-1/2 ">
                      <label className="inline-flex  text-sm font-medium text-gray-700">
                        Required Delivery
                      </label>
                      <input
                        name="reqDelivery"
                        type="date"
                        className="mt-1 block w-full rounded-lg border border-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={formData.reqDelivery}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className=" mt-3 ml-3 mr-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      incoterm
                    </label>
                    <select
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      name="incoterm"
                      value={formData.incoterm}
                      onChange={handleInputChange}
                    >
                      <option>Select incoterm </option>
                      <option value="FOB">FOB (Free on Board)</option>
                      <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                      <option value="EXW">EXW (Ex Works)</option>
                      <option value="DDP">DDP (Delivered Duty Paid)</option>
                      <option value="DDU">DDU (Delivered Duty Unpaid)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Cargo Information Tab */}
            {activeTab === "cargo" && (
              <div className="space-y-6">
                {/* Add cargo form fields here */}
                <div className=" mt-3 ml-3 mr-3 ">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Container Type
                    </label>
                    <select
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      name="container"
                      value={formData.container}
                      onChange={handleInputChange}
                    >
                      <option>Select container type</option>
                      <option>20ft Standard</option>
                      <option>40ft Standard</option>
                      <option>40ft High Cube</option>
                    </select>
                  </div>
                  {/* Add more cargo fields */}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Height
                      </label>

                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        placeholder="Enter height"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Width
                      </label>

                      <input
                        type="number"
                        name="width"
                        value={formData.width}
                        onChange={handleInputChange}
                        placeholder="Enter width"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Length
                      </label>

                      <input
                        type="number"
                        name="length"
                        value={formData.length}
                        onChange={handleInputChange}
                        placeholder="Enter length"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Volume
                      </label>

                      <input
                        type="number"
                        name="volume"
                        value={formData.volume}
                        onChange={handleInputChange}
                        placeholder="Enter volume"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Weight
                      </label>

                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder="Enter weight"
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                {/* Add preferences form fields here */}
                <div className="mt-3 ml-3 mr-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Service Level
                    </label>
                    <select
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      name="serviceLevel"
                      value={formData.serviceLevel}
                      onChange={handleInputChange}
                    >
                      <option>Select service level</option>
                      <option>Standard</option>
                      <option>Express</option>
                      <option>Premium</option>
                    </select>
                  </div>
                  {/* Add more preference fields */}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-2 flex mb-5  justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                className="px-4 py-2 border mr-5  border-gray-300 rounded-lg text-sm font-medium text-black bg-white hover:bg-gray-50"
              >
                Save as Draft
              </button>
              <button className="px-4 py-2 ml-5 border-transparent rounded-lg border-2 text-sm font-medium text-black bg-white  hover:bg-blue-700 mr-4 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

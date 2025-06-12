import React, { useEffect, useState } from "react";
import "assets/styles/tailwind.css";
import { getClientQuotes } from "services/ApiQuote";



export default function Clientquotes() {
  const [quotes, setQuotes] = useState([]);
  

  useEffect(() => {
    getClientQuotes()
      .then((response) => {
        setQuotes(response);
        console.log("Quotes fetched successfully:", response);
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
      });
      
  }, []);
  

  return (
    <>
      <div className="flex flex-row gap-4 bg-lightBlue-200 mb-2 p-4 rounded-lg">
        <div className="px-3    w-full ">
          <div className=" w-full  ">
            {quotes.length > 0 ? (
              quotes.map((quote, index) => (
                <div
                  key={index}
                  className="bg-custom-blue-gradient2 rounded-lg   shadow-lg  transition-shadow duration-300"
                >
                  <div className="  border-2 p-8   border-blueGray-200 rounded-lg mt-32">
                    <div className="flex justify-between items-center mb-">
                      <h3 className="text-lg font-semibold text-blueGray-700">
                        Quote #{index + 1}
                      </h3>
                      <span className="px-3 py-1 text-2xl font-bold border rounded-lg mb-3 bg-blue-100 text-blue-800 ">
                        {quote.status || "Pending"}
                      </span>
                    </div>

                    <div className=" flex flex-row space-y-4 bg-lightBlue-200 mb-2 mr p-4 rounded-lg">
                      {/* Shipment Details */}
                      <div className="flex flex-col justify-center p-4 rounded-lg  bg-white shadow-sm flex-1 border-2 ">
                        <h4 className="text-md font-semibold text-gray-700 mb-2  ">
                          Shipment Details
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Origin</p>
                            <p className="text-sm font-medium">
                              {quote.origin || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Destination</p>
                            <p className="text-sm font-medium">
                              {quote.destination || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Mode</p>
                            <p className="text-sm font-medium">
                              {quote.mode || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Incoterm</p>
                            <p className="text-sm font-medium">
                              {quote.incoterm || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Cargo Details */}
                      <div className="flex flex-col justify-center p-4 rounded-lg bg-white shadow-sm flex-1 border-2 ml-5">
                        <h4 className="text-md font-semibold text-gray-700 mb-2">
                          Cargo Details
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Container</p>
                            <p className="text-sm font-medium">
                              {quote.container || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Weight</p>
                            <p className="text-sm font-medium">
                              {quote.weight ? `${quote.weight} kg` : "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Volume</p>
                            <p className="text-sm font-medium">
                              {quote.volume ? `${quote.volume} m³` : "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Dimensions</p>
                            <p className="text-sm font-medium">
                              {quote.length && quote.width && quote.height
                                ? `${quote.length}x${quote.width}x${quote.height} cm`
                                : "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">
                              Service Level
                            </p>
                            <p className="text-sm font-medium">
                              {quote.serviceLevel || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Dates */}
                      <div className="flex flex-col justify-center p-4 rounded-lg bg-white shadow-sm flex-1 border-2 ml-5">
                        <h4 className="text-md font-semibold text-gray-700 mb-2">
                          Dates
                        </h4>
                        <div className="grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Ready Date</p>
                            <p className="text-sm font-medium">
                              {quote.readyDate
                                ? new Date(quote.readyDate).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Required By</p>
                            <p className="text-sm font-medium">
                              {quote.reqDelivery
                                ? new Date(
                                    quote.reqDelivery
                                  ).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <p className="text-red-600">No quotes available.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

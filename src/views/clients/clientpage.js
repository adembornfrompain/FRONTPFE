import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "assets/styles/tailwind.css";
import { getClientQuotes } from "services/ApiQuote";

export default function ClientPage() {
  const [latestQuotes, setLatestQuotes] = useState([]);
  const [ stats, setStats ] = useState();

  useEffect(() => {
    getClientQuotes()
      .then((response) => {
        const recentThree = response.slice(0, 3);
        setLatestQuotes(recentThree);

        setStats([
          { num: response.filter(el => el.status === "requested").length, icon: "fa fa-file", label: "Active Quote", link: "/views/clients/clientrequest.js" },
          { num: response.filter(el => el.status === "approved").length, icon: "fa fa-check", label: "Accepted", link: "/views/clients/clientrequest.js" },
        

          { num: response.filter(el => el.status === "in transit").length, icon: "fas fa-box", label: "In Transit" },
          { num: response.filter(el => el.status === "delivered").length, icon: "fa fa-map-marker", label: "Delivered" },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
      });
  }, []);

  return (
    <>
      <div className="w-full p-8">
        {/* Welcome Section */}
        <div className="bg-lightBlue-400 mt-24 mx-5 w-full max-w-3xl text-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, Client!</h1>
          <p className="text-gray-600">
            Welcome to your dashboard. Here you can view your projects, track your progress,
            and manage your account.
          </p>
          <div className="mt-4">
            <Link
              to="/client/clientrequest"
              className="bg-blue-500 hover:bg-blue-600 border-2 text-white font-bold py-2 px-4 rounded"
            >
              Request a Quote 
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard Stats Boxes */}
      <div className="flex flex-wrap  text-emerald-500 p-12 mx-4">
        {stats && stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-off-white shadow-xl rounded ml-3 mr-4 pt-8 pb-26 border-3 flex-auto"
          >
            <ul>
              <li className="flex items-center">
                <i className={`ml-5 ${stat.icon} text-4xl`}></i>
                <div>
                  {stat.link ? (
                    <Link to={stat.link}>
                      <div className="text-xl font-bold text-black ml-2">{stat.label}</div>
                    </Link>
                  ) : (
                    <div className="text-xl font-bold text-black ml-2">{stat.label}</div>
                  )}
                </div>
              </li>
              <li>
                <div className="text-black text-center text-2xl pl-5 mt-4">{ stat.num }</div>
              </li>
            </ul>
          </div>
        ))}
      </div>

      {/* Last 3 Quotes Section */}
      <div className="w-1/2   p-8">
        <div className="bg-blueGray-700rounded-lg p-8 shadow-lg border-3">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Your Recent Quotes</h2>

          {latestQuotes.length > 0 ? (
            latestQuotes.map((quote, idx) => (
              <div
                key={quote.id}
                className="bg-white border border-blue-200 rounded-lg mr-5 shadow p-4 mb-4 mt-1"
              >
                <div className="flex justify-between rounded-lg items-center mb-1">
                  <h3 className="text-md font-semibold text-blue-800">
                    Quote 00{idx + 1 || "N/A"}
                  </h3>
                  <span className="text-sm px-2 py-1 rounded bg-blue-200 text-blue-800 font-medium">
                    {quote.status || "Pending"}
                  </span>
                </div>
                <div className="text-sm text-gray-700 my-2">
                  <p className="font-medium">
                    {quote.origin || "Unknown Origin"} → {quote.destination || "Unknown Destination"}
                  </p>
                  <p className="font-medium my-2">
                    {quote.mode}
                  </p>
                  <p className="font-medium my-2">
                    {quote.incoterm}
                  </p>
                  <p className="font-medium my-2">
                    {quote.container}
                  </p>
                  <p className="text-xs text-gray-500 my-2 ">
                    {quote.readyDate
                      ? `Ready: ${new Date(quote.readyDate).toLocaleDateString()}`
                      : "No ready date"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow text-center text-gray-500">
              No recent quotes available.
            </div>
          )}

          <div className="mt-4 text-right">
            <Link to="/client/quotes" className="text-sm text-blue-600 hover:underline">
              View All Quotes →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

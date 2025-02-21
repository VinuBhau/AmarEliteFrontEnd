import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import ChairmanMessages, { ChairmanMNotice, ChairmanRaiseMDemand } from "./ChairmanMessages";
import { Route, Routes, Link, BrowserRouter } from "react-router-dom";
function Chairman({ setLoginStatus }) {
  const noticeRef = useRef("");
  const messageRef = useRef("");
  const [notices, setNotices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotices();
    fetchMessages();
    const interval = setInterval(() => {
      fetchNotices();
      fetchMessages();
    }, 10000); // Fetch data every 10 seconds
    return () => clearInterval(interval);
  }, []);
  const fetchNotices = async () => {
    try {
      const response = await axios.get("https://amarelitebackend.onrender.com/api/chairman/getNotices");
      setNotices(response.data);
    } catch (err) {
      setError("Failed to fetch notices");
      console.error(err);
    }
  };
  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/chairman/getMessages");
      setMessages(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  const filteredNotices = notices.filter((notice) =>
    (notice?.notice || "").toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredMessages = messages.filter((message) =>
    (message?.message || "").toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <BrowserRouter>
  <div>
    {/* Navbar */}
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chairman Dashboard</h1>
        <ul className="flex gap-6">
          <li>
            <Link to="/message">Messages</Link>
          </li>
          <li>
            <Link to="/notice">Notices</Link>
          </li>
        </ul>
      </div>
    </nav>

    {/* Main Content */}
    <div className="container mx-auto p-4 flex gap-10">
      {/* Left Section: Messages and Notices */}
      <div className="flex flex-col gap-10 w-1/3">
        {/* Notices Section */}
        <section id="notices">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Notices</h2>
          <div className="space-y-4">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <div
                  key={notice._id}
                  className="p-4 bg-white rounded-md shadow-md flex justify-between items-center"
                >
                  <p>{notice.notice}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No notices available.</p>
            )}
          </div>
        </section>

        {/* Messages Section */}
        <section id="messages">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Messages</h2>
          <div className="space-y-4">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <div
                  key={message._id}
                  className="p-4 bg-white rounded-md shadow-md flex justify-between items-center"
                >
                  <p>{message.message}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No messages available.</p>
            )}
          </div>
        </section>
      </div>

      {/* Right Section: Routed Components */}
      <div className="w-2/3">
        <Routes>
          <Route path="/message" element={<ChairmanMessages />} />
          <Route path="/notice" element={<ChairmanMNotice />} />
          <Route path="/" element={<p>Select an option from the navigation menu.</p>} />
        </Routes>
      </div>
    </div>
  </div>
</BrowserRouter>


  );
};

export default Chairman;

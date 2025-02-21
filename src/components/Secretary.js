import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import Employee from "./Employee";
import Paymentdue from "./Paymentdue";
import Raisedemand from "./Raisedemand";
import Viewcomplaints from "./Viewcomplaints";

function AddExpense() {
  const [expense, setExpense] = useState({
    date: "",
    amount: "",
    description: "",
    status: "",
    modeOfPayment: "",
    personOrAgencyName: "",
    monthOfPayment: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddExpense = (event) => {
    event.preventDefault();
    axios
      .post("https://amarelitebackend.onrender.com/api/secretary/addExpense", expense)
      .then(() => {
        alert("Expense added successfully!");
        setExpense({
          date: "",
          amount: "",
          description: "",
          status: "",
          modeOfPayment: "",
          personOrAgencyName: "",
          monthOfPayment: "",
        });
      })
      .catch((err) => {
        console.error("Error adding expense:", err);
        alert("Failed to add expense. Please try again.");
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto bg-white text-gray-900 p-6 rounded-lg shadow-xl">
        <h2 className="text-center text-2xl font-semibold mb-6 text-blue-600">
          Add Expense
        </h2>
        <form className="space-y-6" onSubmit={handleAddExpense}>
          {[{ label: "Expense Date", name: "date", type: "date" },
            { label: "Expense Amount", name: "amount", type: "number", placeholder: "Enter amount" },
            { label: "Description", name: "description", type: "text", placeholder: "Describe the expense" },
            { label: "Status", name: "status", type: "text", placeholder: "e.g., Paid, Pending" },
            { label: "Mode of Payment", name: "modeOfPayment", type: "text", placeholder: "e.g., Cash, Card" },
            { label: "Person/Agency Name", name: "personOrAgencyName", type: "text", placeholder: "Name of person or agency" },
            { label: "Payment Month", name: "monthOfPayment", type: "text", placeholder: "Enter month of payment" }]
            .map(({ label, name, type, placeholder }) => (
              <div key={name} className="space-y-2">
                <label className="text-sm font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={expense[name]}
                  onChange={handleInputChange}
                  placeholder={placeholder || ""}
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

function SendReminder() {
  const [reminder, setReminder] = useState({
    oid: "",
    reminder: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReminder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendReminder = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:9000/api/secretary/sendReminder", reminder)
      .then(() => {
        alert("Reminder sent successfully!");
        setReminder({ oid: "", reminder: "" });
      })
      .catch((err) => {
        console.error("Error sending reminder:", err);
        alert("Failed to send reminder. Please try again.");
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto bg-white text-gray-900 p-6 rounded-lg shadow-xl">
        <h2 className="text-center text-2xl font-semibold mb-6 text-teal-600">
          Send Reminder
        </h2>
        <form className="space-y-6" onSubmit={handleSendReminder}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Owner's ID</label>
            <input
              type="text"
              name="oid"
              value={reminder.oid}
              onChange={handleInputChange}
              placeholder="Enter OID"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Reminder Message</label>
            <textarea
              name="reminder"
              value={reminder.reminder}
              onChange={handleInputChange}
              placeholder="Type your reminder message here"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition duration-300 ease-in-out"
          >
            Send Reminder
          </button>
        </form>
      </div>
    </div>
  );
}

function Secretary({ setLoginStatus }) {
  const logout = () => setLoginStatus(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 text-gray-900">
        <header className="py-4 bg-blue-700 text-white shadow-md">
          <div className="container mx-auto flex justify-between items-center px-6">
            <h1 className="text-3xl font-semibold">Secretary Dashboard</h1>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        </header>
        <nav className="py-4 bg-blue-600 text-white">
          <div className="container mx-auto flex flex-wrap justify-center gap-6">
            {[{ path: "/add-expense", label: "Add Expense" },
              { path: "/send-reminder", label: "Send Reminder" },
              { path: "/make-salary", label: "Make Salary" },
              { path: "/raise-demand", label: "Raise Demand" },
              { path: "/view-paymentdues", label: "View Payment Dues" },
              { path: "/view-lodgedcomplaints", label: "View Complaints" }]
              .map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  {label}
                </Link>
              ))}
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/add-expense" element={<AddExpense />} />
            <Route path="/send-reminder" element={<SendReminder />} />
            <Route path="/raise-demand" element={<Raisedemand />} />
            <Route path="/view-paymentdues" element={<Paymentdue />} />
            <Route path="/view-lodgedcomplaints" element={<Viewcomplaints />} />
            <Route
              path="/make-salary"
              element={
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 max-w-md">
                    <Employee />
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default Secretary;

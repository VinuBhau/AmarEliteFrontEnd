import axios from 'axios';
import React, { useRef } from 'react';
import { FaCalendarAlt } from 'react-icons/fa'; // Importing an icon from react-icons

function AdminSettings() {
  const financialyear = useRef("");
  const annualmaintainence = useRef("")

  const setmaintainenceamount = () => {
    let annualmaintainence1 = annualmaintainence.current.value;

    const payload4 = {
      annualmaintainence: annualmaintainence1
    }
    axios.post("https://amarelitebackend.onrender.com/api/admin/setannualmaintainence", payload4)
      .then((response) => {
        alert("Annual Maintainence amount set successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const setFinancialYear = () => {
    let financialyear1 = financialyear.current.value;

    const payload = {
      financialyear: financialyear1,
    };
    axios
      .post("http://localhost:9000/api/admin/setfinancialyear", payload)
      .then((response) => {
        alert("Financial year set successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 relative">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-600 opacity-20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Card */}
      <div className="relative bg-white shadow-lg rounded-lg p-8 w-full max-w-md z-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-3">
          <FaCalendarAlt className="text-blue-500" />
          <span>Set Financial Year</span>
        </h2>

        {/* Input Section */}
        <div className="mb-4">
          <label
            htmlFor="financialyear"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Financial Year
          </label>
          <div className="relative">
            <input
              ref={financialyear}
              id="financialyear"
              placeholder="Enter Financial Year"
              className="block w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
            />
            {/* <FaCalendarAlt className="absolute left-3 top-2.5 text-gray-400" /> */}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={setFinancialYear}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center justify-center space-x-2"
        >
          <FaCalendarAlt className="text-white" />
          <span>Set Financial Year</span>
        </button>
      </div>
      <div className="relative bg-white shadow-lg rounded-lg p-8 w-full max-w-md z-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-3">Set Maintainence Amount</h2>
        <input type='text' className="block w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
          ref={annualmaintainence} placeholder='Enter maintainence amount'></input>
        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center justify-center space-x-2"
          onClick={setmaintainenceamount}>Set Maintainence Amount</button>
      </div>
    </div>
  );
}

export default AdminSettings;

import React, { useState } from 'react';
import axios from 'axios';
import '../output.css';

const Addemployee = () => {
  const [formData, setFormData] = useState({
    empcellno: '',
    empgender: 'M',
    empid: '',
    empname: '',
    empaadhaarno: '',
    empaddress: '',
    empsalarydet: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://amarelitebackend.onrender.com/api/admin/addemployee', formData);
      console.log('Data submitted successfully:', response.data);
      alert('Employee data saved successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to save data. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-t from-blue-600 to-white px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-2xl rounded-xl p-6 sm:p-8 lg:p-10 max-w-lg w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-6">
          Employee Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
            <input
              type="text"
              name="empid"
              value={formData.empid}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="empname"
              value={formData.empname}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cell No</label>
            <input
              type="text"
              name="empcellno"
              value={formData.empcellno}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="empgender"
              value={formData.empgender}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Aadhaar No</label>
            <input
              type="number"
              name="empaadhaarno"
              value={formData.empaadhaarno}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="empaddress"
              value={formData.empaddress}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addemployee;

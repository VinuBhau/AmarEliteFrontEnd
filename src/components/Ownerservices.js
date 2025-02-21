import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get(`https://amarelitebackend.onrender.com/api/owner/getOwnerServices`)
      .then((response) => {
        setServices(response.data);
      })
      .catch((err) => {
        console.error('Error fetching owner services data:', err);
      });
  }, []);

  return (
    <div className="p-4 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto">
        {/* <h1 className="text-lg font-bold mb-4 text-center text-yellow-400">
          Owner Services Information
        </h1> */}

        {/* Services Table */}
        {services.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-700 text-sm">
              <thead>
                <tr className="bg-gray-700 text-yellow-300">
                  <th className="border border-gray-600 p-2 text-left">Service Name</th>
                  <th className="border border-gray-600 p-2 text-left">Name</th>
                  <th className="border border-gray-600 p-2 text-left">Cell No</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
                    } hover:bg-gray-600 transition-colors duration-200`}
                  >
                    <td className="border border-gray-600 p-2">{service.servicename}</td>
                    <td className="border border-gray-600 p-2">{service.name}</td>
                    <td className="border border-gray-600 p-2">{service.cellno}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-400">No services available.</p>
        )}
      </div>
    </div>
  );
};

export default OwnerServices;

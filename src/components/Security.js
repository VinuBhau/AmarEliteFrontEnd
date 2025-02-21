import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

function Visitors({ setLoginStatus }) {
  const [visitors, setVisitors] = useState([]);
  const vname = useRef("");
  const vcellno = useRef("");
  const flatno = useRef("");
  const vdate = useRef("");
  const vpurpose = useRef("");
  const intime = useRef("");
  const outtime = useRef("");

  useEffect(() => {
    axios
      .get("https://amarelitebackend.onrender.com/api/security/getallvisitors")
      .then((response) => {
        setVisitors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [visitors]);

  const logout = () => {
    setLoginStatus(false);
  };

  const addvisitor = () => {
    const payload = {
      vname: vname.current.value,
      vcellno: vcellno.current.value,
      flatno: flatno.current.value,
      vdate: vdate.current.value,
      vpurpose: vpurpose.current.value,
      intime: intime.current.value,
      outtime: outtime.current.value,
    };

    axios
      .post("http://localhost:9000/api/security/addvisitors", payload)
      .then(() => {
        alert("Visitor added successfully!");
        vname.current.value = "";
        vcellno.current.value = "";
        flatno.current.value = "";
        vdate.current.value = "";
        vpurpose.current.value = "";
        intime.current.value = "";
        outtime.current.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-600 text-gray-900 flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full max-w-screen-lg flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold text-blue-900">Security Dashboard</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition-all shadow-md"
        >
          Logout
        </button>
      </header>

      <main className="w-full max-w-screen-lg flex flex-col lg:flex-row gap-8 mt-6">
        {/* Visitors Information */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Visitors Information
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-blue-700 text-white">
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Contact</th>
                  <th className="p-2 text-left">Flat No</th>
                  <th className="p-2 text-left">Purpose</th>
                  <th className="p-2 text-left">In Time</th>
                  <th className="p-2 text-left">Out Time</th>
                  <th className="p-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((v, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="p-2 border">{v.vname}</td>
                    <td className="p-2 border">{v.vcellno}</td>
                    <td className="p-2 border">{v.flatno}</td>
                    <td className="p-2 border">{v.vpurpose}</td>
                    <td className="p-2 border">{v.intime}</td>
                    <td className="p-2 border">{v.outtime}</td>
                    <td className="p-2 border">{v.vdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Visitor's Form */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Fill the Visitor's Form
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addvisitor();
            }}
            className="space-y-4"
          >
            <input
              ref={vname}
              className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Visitor's Name"
              required
            />
            <input
              ref={flatno}
              className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Flat Number"
              required
            />
            <input
              ref={vcellno}
              className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Contact Number"
              required
            />
            <input
              ref={vdate}
              className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border focus:ring-2 focus:ring-blue-500"
              type="date"
              required
            />
            <input
              ref={intime}
              className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border focus:ring-2 focus:ring-blue-500"
              type="time"
              placeholder="In Time"
              required
            />
            <input
              ref={outtime}
              className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border focus:ring-2 focus:ring-blue-500"
              type="time"
              placeholder="Out Time"
            />
            <input
              ref={vpurpose}
              className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 border focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Purpose of Visit"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-700 hover:bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md"
            >
              Add Visitor
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Visitors;

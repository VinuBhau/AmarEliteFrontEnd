import React, { useRef } from "react";
import axios from "axios";

function AddApartmentDetails() {
  const ApartmentName = useRef("");
  const BuilderName = useRef("");
  const Address = useRef("");
  const AreaName = useRef("");
  const City = useRef("");
  const NoOfWings = useRef("");
  const NoOfFlats = useRef("");
  const NoOfFloors = useRef("");
  const SocietyName = useRef("");
  const RegistrationNumber = useRef("");
  const RegistrationDate = useRef("");

  const addApartmentDetails = () => {
    const payload = {
      ApartmentName: ApartmentName.current.value,
      BuilderName: BuilderName.current.value,
      Address: Address.current.value,
      AreaName: AreaName.current.value,
      City: City.current.value,
      NoOfWings: NoOfWings.current.value,
      NoOfFlats: NoOfFlats.current.value,
      NoOfFloors: NoOfFloors.current.value,
      SocietyName: SocietyName.current.value,
      RegistrationNumber: RegistrationNumber.current.value,
      RegistrationDate: RegistrationDate.current.value,
    };

    axios
      .post("https://amarelitebackend.onrender.com/api/admin/insertApartmentDetails", payload)
      .then((response) => {
        alert("Apartment details have been successfully inserted!");
        // Clear input fields after submission
        ApartmentName.current.value = "";
        BuilderName.current.value = "";
        Address.current.value = "";
        AreaName.current.value = "";
        City.current.value = "";
        NoOfWings.current.value = "";
        NoOfFlats.current.value = "";
        NoOfFloors.current.value = "";
        SocietyName.current.value = "";
        RegistrationNumber.current.value = "";
        RegistrationDate.current.value = "";
      })
      .catch((err) => {
        console.error("Error inserting apartment details:", err);
        alert("Failed to insert apartment details. Please try again.");
      });
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h2 className="text-white text-3xl font-extrabold mb-6 text-center">Add Apartment Details</h2>
      <div className="space-y-6">
        <div className="relative">
          <input
            type="text"
            ref={ApartmentName}
            className="w-full px-6 py-4 text-gray-900 rounded-lg border-none focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
            placeholder="Apartment Name"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            ref={BuilderName}
            className="w-full px-6 py-4 text-gray-900 rounded-lg border-none focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
            placeholder="Builder Name"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            ref={Address}
            className="w-full px-6 py-4 text-gray-900 rounded-lg border-none focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
            placeholder="Address"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            ref={AreaName}
            className="w-full px-6 py-4 text-gray-900 rounded-lg border-none focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
            placeholder="Area Name"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            ref={City}
            className="w-full px-6 py-4 text-gray-900 rounded-lg border-none focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
            placeholder="City"
          />
        </div>
        <div className="relative">
          <input
            type="number"
            ref={NoOfWings}
            className="w-full px-6 py-4 text-gray-900 rounded-lg border-none focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
            placeholder="No. of Wings"
          />
        </div>
        <div className="relative">
          <input
            type="number"
            ref={NoOfFlats}
            className="w-full px-6 py-4 text-gray-900 rounded-lg border-none focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
            placeholder="No. of Flats"
          />
        </div>
        <div className="relative">
          <input
            type="number"
            ref={NoOfFloors}
            className="w-full px-6 py-4 text-gray-900 rounded-lg border-none focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
            placeholder="No. of Floors"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            ref={SocietyName}
            className="w-full px-6 py-4 text-gray-900 rounded-lg border-none focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
            placeholder="Society Name"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            ref={RegistrationNumber}
            className="w-full px-6 py-4 text-gray-900 rounded-lg border-none focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
            placeholder="Registration Number"
          />
        </div>
        <div className="relative">
          <input
            type="date"
            ref={RegistrationDate}
            className="w-full px-6 py-4 text-gray-900 rounded-lg border-none focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
            placeholder="Registration Date"
          />
        </div>
        <div className="text-center">
          <button
            className="w-full px-6 py-4 font-semibold text-white bg-gradient-to-r from-pink-500 to-red-500 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition-transform"
            onClick={addApartmentDetails}
          >
            Add Apartment Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddApartmentDetails;

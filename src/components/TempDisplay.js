import React, { useState, useEffect } from "react";
import axios from "axios";

const TempDisplay = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://amarelitebackend.onrender.com/temperature"); // Replace with your backend URL
        setTemperatureData(response.data);
      } catch (err) {
        setError("Failed to fetch temperature data");
      } finally {
        setLoading(false);
      }
    };

    // Fetch data on component mount
    fetchTemperature();

    // Optional: Refresh data every 10 seconds
    const interval = setInterval(fetchTemperature, 6000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Determine circle color based on temperature
  const getCircleColor = (temperature) => {
    if (temperature <= 32) return "green";
    if (temperature > 32 && temperature <= 35) return "blue";
    return "red";
  };

  if (loading) {
    return <p>Loading temperature data...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Solar Heater Temperature</h1>
      {temperatureData.length > 0 ? (
        <ul>
          {temperatureData.map((item, index) => (
            index>0?
            <li key={index} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: getCircleColor(item.temperature),
                  marginRight: "10px",
                }}
              ></div>
              
              <div>
                <strong>Time:</strong> {new Date(item.time).toLocaleString()} |{" "}
                <strong>Temperature:</strong> {item.temperature}°C
              </div>
            </li>:""
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <img
                    src='/solar.jpg'
                    alt='solarimage'
                    style={{
                        height: '75vh',   // 3/4th of the page height
                        width: '80%',     // 80% of the page width
                        objectFit: 'cover' // Ensures the image doesn't stretch out
                    }}
                />
            </div>
    </div>
  );
};

export default TempDisplay;

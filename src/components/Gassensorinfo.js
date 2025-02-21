import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

function Gassensorinfo() {
    const [gasSensorData, setgasSensorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTemperature = async () => {
            try {
                setLoading(true);
                const response = await axios.get("https://amarelitebackend.onrender.com/temperature"); // Replace with your backend URL
                setgasSensorData(response.data);
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
    const getCircleColor = (gasSensorData) => {
        if (gasSensorData < 10) return "green";
        if (gasSensorData >= 10 && gasSensorData <= 35) return "orange";
        return "red";
    };

    if (loading) {
        return <p>Loading gasSensor data...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1 style={{
                textAlign: 'center',          // Center the title
                fontSize: '2.5rem',           // Increase the font size
                color: '#4CAF50',             // Set a nice green color (adjust as needed)
                fontFamily: "'Roboto', sans-serif", // Use a modern, clean font family
                fontWeight: 'bold',           // Make the title bold
                marginBottom: '20px'         // Add some spacing below the title
            }}>
                Gas Sensor Info
            </h1>
            {gasSensorData.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
                    {gasSensorData.map((item, index) => (
                        index > 0 ? (
                            <li key={index} style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
                                <div
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: getCircleColor(item.gasSensorData),
                                        marginRight: "10px",
                                    }}
                                ></div>

                                <div style={{ textAlign: "center" }}>
                                    <strong>Time:</strong> {new Date(item.time).toLocaleString()} |{" "}
                                    <strong>Gas Sensor Info:</strong> {item.gasSensorData}ppm
                                </div>
                            </li>
                        ) : ""
                    ))}
                </ul>
            ) : (
                <p style={{ textAlign: 'center' }}>No data available</p>
            )}


            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <img
                    src='/gas1.jpg'
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
}

export default Gassensorinfo;

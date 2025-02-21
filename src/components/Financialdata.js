import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Financialdata() {
    const [financedata, setFinancedata] = useState([]);
    useEffect(() => {
        axios.get(`https://amarelitebackend.onrender.com/api/owner/getfinancedata`)
            .then((response) => {
                setFinancedata(response.data);
            })
            .catch((err) => {
                console.error('Error fetching maintenance data:', err);
            });
    }, [financedata]);
    return (
        <div className="p-4 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-lg font-bold mb-4 text-center text-yellow-400">Maintenance Payment Information</h1>
                {financedata.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-700 text-sm">
                            <thead>
                                <tr className="bg-gray-700 text-yellow-300">
                                    <th className="border border-gray-600 p-2 text-left">Financial Year</th>
                                    <th className="border border-gray-600 p-2 text-left">Balance carried forward</th>
                                    <th className="border border-gray-600 p-2 text-left">Amount collected(₹)</th>
                                    <th className="border border-gray-600 p-2 text-left">Amount expected</th>
                                    <th className="border border-gray-600 p-2 text-left">Total amount</th>
                                    <th className="border border-gray-600 p-2 text-left">Expenses</th>
                                    <th className="border border-gray-600 p-2 text-left">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {financedata.map((M, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'} hover:bg-gray-600 transition-colors duration-200`}>
                                        <td className="border border-gray-600 p-2">{M.financialyear}</td>
                                        <td className="border border-gray-600 p-2">{M.balancecarriedforward}</td>
                                        <td className="border border-gray-600 p-2">₹{M.amountcollected}</td>
                                        <td className="border border-gray-600 p-2">{M.amountexpected}</td>
                                        <td className="border border-gray-600 p-2">{M.totalamount}</td>
                                        <td className="border border-gray-600 p-2">{M.expenses}</td>
                                        <td className="border border-gray-600 p-2">{M.balance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-400">No finance records available</p>
                )}
            </div>
        </div>
    );
}

export default Financialdata;

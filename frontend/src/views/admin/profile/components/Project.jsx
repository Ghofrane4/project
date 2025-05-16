import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "components/card";

const Project = () => {
  const [history, setHistory] = useState([]);
  const userId = localStorage.getItem('id'); // Assuming you store user ID in local storage

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/superadmins/history/${userId}`);
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  return (
    <Card extra={"w-full p-4 h-full"}>
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          historique
        </h4>
        <p className="mt-2 text-base text-gray-600">
          Vous trouverez ici plus de détails sur vos activités.
        </p>
      </div>

      <div className="overflow-y-auto max-h-64"> {/* Set max height and make it scrollable */}
        {history.length > 0 ? (
          history.map((item) => (
            <div
              key={item.id}
              className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
            >
              <div className="flex items-center">
                <div className="ml-4">
                  <p className="text-base font-medium text-navy-700 dark:text-white">
                    {item.action}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-white">No history available.</p>
        )}
      </div>
    </Card>
  );
};

export default Project;

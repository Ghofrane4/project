import React, { useState } from "react";

const InviteUser = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState(""); // State to manage message color

  const handleSendInvite = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/superadmins/send-registration-link`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });


      const data = await response.json();

      if (response.ok) {
        setMessage("Invitation sent successfully!");
        setMessageColor("text-green-500"); // Set color to green
      } else {
        setMessage(`Error: ${data.message}`);
        setMessageColor("text-red-500"); // Set color to red for errors
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setMessageColor("text-red-500"); // Set color to red for errors

    }
  };

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-1 mb-4">
        <h2 className="text-xl font-bold mb-4">Invite User</h2>
        <label className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter user email"
        />
        <button
          onClick={handleSendInvite}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send Invite
        </button>
        {message && <p className={`mt-2 text-sm ${messageColor}`}>{message}</p>}
      </div>
    </div>
  );
};

export default InviteUser;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const MenuTickets = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [response, setResponse] = useState("");
  const [isResponseSent, setIsResponseSent] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`http://localhost:5000/nouvquestion/nouv/${id}`);
        const data = await res.json();
        setTicket(data);
        setResponse(data.reponse || ""); // Pré-remplir s'il y a une réponse
      } catch (error) {
        toast.error("Erreur lors du chargement du ticket !");
        console.error(error);
      }
    };

    fetchTicket();
  }, [id]);

  const handleSend = async () => {
    try {
      await axios.put(`http://localhost:5000/nouvquestion/upd/${id}`, {
        reponse: response,
      });

      toast.success("✅ Réponse envoyée !");
      setIsResponseSent(true);
    } catch (error) {
      toast.error("❌ Erreur lors de l'envoi !");
      console.error(error);
    }
  };

  if (!ticket) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        ⏳ Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-12 bg-white">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-8 space-y-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-indigo-700">{ticket.societe}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(ticket.dateC).toLocaleDateString()} •{" "}
              {new Date(ticket.dateC).toLocaleTimeString()}
            </p>
          </div>
          <div className="text-sm text-right mt-4 sm:mt-0">
            <p className="text-gray-600">Ticket n° {ticket.id}</p>
            <p className="text-indigo-500 font-medium">{ticket.email}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 space-y-3">
          <h3 className="text-md font-semibold text-gray-700">Sujet : {ticket.sujet}</h3>
          <p className="text-gray-600 leading-relaxed">{ticket.message}</p>
        </div>

        {!isResponseSent && (
          <textarea
            placeholder="Tapez votre réponse ici..."
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            className="w-full h-32 p-4 rounded-xl bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700 resize-none"
          />
        )}

        <div className="flex justify-end">
          {!isResponseSent && (
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition shadow-md"
            >
              Envoyer
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate("/user/contact/testt")}
          className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-3 rounded-full font-medium shadow transition duration-300"
        >
          <FaArrowLeft /> Retour
        </button>
      </div>
    </div>
  );
};

export default MenuTickets;

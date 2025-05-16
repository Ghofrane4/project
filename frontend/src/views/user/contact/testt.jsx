import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaReply, FaTrashAlt, FaPaperPlane } from "react-icons/fa";


function Test1() {
  const navigate = useNavigate();
  const [filterPriority, setFilterPriority] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterText, setFilterText] = useState("");
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    document.title = "Tickets";
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const idUser = localStorage.getItem("id");
      const response = await axios.get(`http://localhost:5000/questions/getques/${idUser}`);
      const filteredData = response.data.filter((item) => item.statuts !== "archivé");
      const formattedTickets = filteredData.map((item, index) => ({
        id: item.id,
        societe: item.societe,
        sujet: item.sujet,
        priority: item.priorite || "Moyenne",
        date: item.dateC?.substring(0, 10),
        response: item.reponse || "Aucune réponse",
        numero: `TCK-${String(index + 1).padStart(3, "0")}`,
      }));
      setTickets(formattedTickets);
    } catch (error) {
      console.error("Erreur lors du chargement des tickets :", error);
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesPriority = filterPriority ? ticket.priority === filterPriority : true;
    const matchesDate = filterDate ? ticket.date === filterDate : true;
    const matchesText = filterText
      ? ticket.societe.toLowerCase().includes(filterText.toLowerCase()) ||
        ticket.sujet.toLowerCase().includes(filterText.toLowerCase()) ||
        ticket.numero.toLowerCase().includes(filterText.toLowerCase())
      : true;
    return matchesPriority && matchesDate && matchesText;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Élevé":
        return "text-red-600 font-semibold";
      case "Moyenne":
        return "text-yellow-500 font-semibold";
      case "Faible":
        return "text-green-600 font-semibold";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-white py-10 px-6 font-sans">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Messages Reçus</h1>

      {/* Filtres */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher par N° Ticket, Société ou Sujet..."
          className="w-72 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">Priorité</option>
          <option value="Faible">Faible</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Élevé">Élevé</option>
        </select>
      </div>

      {/* Tableau */}
      <div className="overflow-hidden rounded-xl shadow-md border bg-white max-w-6xl mx-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Société</th>
              <th className="px-6 py-4 text-left">N° Ticket</th>
              <th className="px-6 py-4 text-left">Sujet</th>
              <th className="px-6 py-4 text-left">Priorité</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Réponse</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket, index) => (
                <tr
                  key={ticket.id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                >
                  <td className="px-6 py-4">{ticket.societe}</td>
                  <td className="px-6 py-4">{ticket.numero}</td>
                  <td className="px-6 py-4">{ticket.sujet}</td>
                  <td className={`px-6 py-4 ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</td>
                  <td className="px-6 py-4">{ticket.date}</td>
                  <td className="px-6 py-4">{ticket.response}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  Aucun ticket trouvé 📭
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Test2() {  
  const navigate = useNavigate();
  const iduser = localStorage.getItem("id");

  const [formData, setFormData] = useState({
    sujet: "",
    societe: "",
    email: "",
    priorite: "Moyenne",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.sujet.trim()) {
      toast.error("Le sujet est requis.");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Le destinataire est requis.");
      return false;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      toast.error("Le message doit contenir au moins 10 caractères.");
      return false;
    }
    return true;
  };

  const fetchAdminId = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/Superadmins/getsuperAdminInfoMail/${encodeURIComponent(email)}`
      );
      if (response.status === 200 && response.data) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'admin ID:", error);
      console.error("Erreur dans findSuperAdminEmail:", error);
      
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const toastId = toast.loading("Envoi du message...");

    try {
      console.log(" formData.email" + formData.email )
      const idadmin = await fetchAdminId(formData.email);
      if (!idadmin) {
        toast.update(toastId, {
          render: "Admin introuvable pour cet email.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setIsLoading(false);
        return;
      }

      const messageData = {
        iduser,
        idadmin,
        ...formData,
      };

      await axios.post("http://localhost:5000/questions", messageData);

      toast.update(toastId, {
        render: "Message envoyé avec succès !",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      setFormData({
        sujet: "",
        societe: "",
        email: "",
        priorite: "Moyenne",
        message: "",
      });

      setTimeout(() => {
        navigate("/user/contact/testt");
      }, 3001);


    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      toast.update(toastId, {
        render: "Erreur lors de l'envoi du message.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-6 flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-8">
        <div className="flex items-center justify-between mb-6">
    
          <h2 className="text-2xl font-bold text-indigo-700 text-center flex-1">Créer un Message</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
 
          <div>
            <label htmlFor="sujet" className="block font-medium text-gray-700 mb-1">
              Sujet *
            </label>
            <input
              id="sujet"
              name="sujet"
              type="text"
              value={formData.sujet}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label htmlFor="societe" className="block font-medium text-gray-700 mb-1">
              Société
            </label>
            <input
              id="societe"
              name="societe"
              type="text"
              value={formData.societe}
              onChange={handleChange}
              placeholder="Nom de la société"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
              Destinataire *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Adresse email de l'admin"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div>
            <label htmlFor="priorite" className="block font-medium text-gray-700 mb-1">
              Priorité
            </label>
            <select
              id="priorite"
              name="priorite"
              value={formData.priorite}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
            >
          <option value="Faible">Faible</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Élevé">Élevé</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block font-medium text-gray-700 mb-1">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Votre message ici..."
              className="w-full border border-gray-300 px-4 py-2 rounded-lg h-40 resize-none focus:ring-2 focus:ring-indigo-400"
              required
              minLength="10"
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.message.length} / 10 caractères minimum
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full shadow-md transition ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a12 12 0 00-12 12h4z" />
                  </svg>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <FaPaperPlane /> Envoyer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
}

function Test3() {
  const [tickets, setTickets] = useState([]);
  const [filterText, setFilterText] = useState("");  // Définition de filterText
  const [filterDate, setFilterDate] = useState("");  // Définition de filterDate
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Détails des Tickets";
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/nouvquestion/nouvQuestions/${userId}`
      );
      setTickets(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des tickets :", error);
    }
  };

  const handleReply = (id) => {
    navigate(`/user/contact/rep/${id}`);
  };

  // Filtrage des tickets en fonction du texte et de la date
  const filteredTickets = tickets.filter((ticket) => {
    const matchText =
      ticket.email?.toLowerCase().includes(filterText.toLowerCase()) ||
      ticket.sujet?.toLowerCase().includes(filterText.toLowerCase());

    const matchDate =
      filterDate === "" || ticket.dateC?.startsWith(filterDate);

    return matchText && matchDate;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-white py-10 px-6 font-sans">
      {/* Zone de recherche */}
      <div className="max-w-xl mx-auto mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Rechercher par N° Ticket, Email.."
          className="w-72 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}  // Met à jour filterText
        />
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}  // Met à jour filterDate
        />
      </div>

      {/* Tableau des tickets */}
      <div className="overflow-x-auto rounded-xl shadow-md border bg-white max-w-full mx-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">N° Ticket</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Sujet</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Réponse</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-3">TCK-{String(ticket.iduser).padStart(3, "0")}</td>
                  <td className="px-4 py-3">{ticket.email}</td>
                  <td className="px-4 py-3">{ticket.sujet}</td>
                  <td className="px-4 py-3">{ticket.message}</td>
                  <td className="px-4 py-3">
                    {ticket.reponse && ticket.reponse.trim() !== "" ? ticket.reponse : "Pas encore de réponse"}
                  </td>
                  <td className="px-4 py-3">{ticket.dateC}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleReply(ticket.id)}
                      className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-full text-xs shadow transition"
                    >
                      <FaReply /> Répondre
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  Aucun ticket trouvé ou chargement en cours...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}



export default function TestsPage() {
  const [tab, setTab] = useState(1);

  return (
    <div className="p-8">
      
      <div className="flex justify-center gap-4 mb-8">
        {[1, 2, 3].map((value) => (
          <button
            key={value}
            className={`px-6 py-2 rounded font-bold ${
              tab === value ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
            }`}
            onClick={() => setTab(value)}
          >
            {["mes questions", "Contacter", "Question par l'admin"][value - 1]}
          </button>
        ))}
      </div>

      {tab === 1 && <Test1 />}
      {tab === 2 && <Test2 />}
      {tab === 3 && <Test3 />}
    </div>
  );
}

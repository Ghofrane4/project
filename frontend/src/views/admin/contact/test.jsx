import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaReply, FaTrashAlt, FaArrowLeft } from "react-icons/fa";

function Ticket1() {
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
      const idAdmin = localStorage.getItem("id");
      const response = await axios.get(
        `http://localhost:5000/questions/myquestions/${idAdmin}`
      );
      const filteredData = response.data.filter(
        (item) => item.archive !== "oui"
      );
      const formattedTickets = filteredData.map((item, index) => ({
        id: item.id,
        societe: item.societe,
        sujet: item.sujet,
        priority: item.priorite || "Moyenne",
        date: item.dateC?.substring(0, 10),
        numero: `TCK-${String(index + 1).padStart(3, "0")}`,
      }));
      setTickets(formattedTickets);
    } catch (error) {
      console.error("Erreur lors du chargement des tickets :", error);
    }
  };

  const handleReply = (id) => {
    navigate(`/admin/test/reply/${id}`);
  };

  const handleArchive = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/questions/arch/${id}`);
      setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    } catch (error) {
      console.error("Erreur lors de l'archivage :", error);
      alert("Une erreur s'est produite lors de l'archivage.");
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesPriority = filterPriority
      ? ticket.priority === filterPriority
      : true;
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
      
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder=" Rechercher par N° Ticket, Société ou Sujet..."
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

      <div className="overflow-hidden rounded-xl shadow-md border bg-white max-w-6xl mx-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Société</th>
              <th className="px-6 py-4 text-left">N° Ticket</th>
              <th className="px-6 py-4 text-left">Sujet</th>
              <th className="px-6 py-4 text-left">Priorité</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket, index) => (
                <tr
                  key={ticket.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-6 py-4">{ticket.societe}</td>
                  <td className="px-6 py-4">{ticket.numero}</td>
                  <td className="px-6 py-4">{ticket.sujet}</td>
                  <td className={`px-6 py-4 ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </td>
                  <td className="px-6 py-4">{ticket.date}</td>
                  <td className="px-6 py-4 flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleReply(ticket.id)}
                      className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-full text-xs shadow transition"
                    >
                      <FaReply /> Répondre
                    </button>
                    <button
                      onClick={() => handleArchive(ticket.id)}
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs shadow transition"
                    >
                      <FaTrashAlt /> Archiver
                    </button>
                  </td>
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

function Ticket2() {
    const navigate = useNavigate();
    const [filterPriority, setFilterPriority] = useState("");
    const [filterText, setFilterText] = useState("");
    const [tickets, setTickets] = useState([]);
  
    useEffect(() => {
      document.title = "Tickets clôturés";
      fetchTickets();
    }, []);
  
    const fetchTickets = async () => {
      try {
        const res = await axios.get("http://localhost:5000/questions/col");
        setTickets(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des tickets :", error);
      }
    };
  
    const handleArchive = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/questions/archclo/${id}`);
        setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
      } catch (error) {
        console.error("Erreur lors de l'archivage :", error);
        alert("Une erreur s'est produite lors de l'archivage.");
      }
    };
  
    const filteredTickets = tickets.filter((ticket) => {
      const matchesPriority = filterPriority
        ? ticket.priorite === filterPriority
        : true;
      const matchesText = filterText
        ? ticket.societe.toLowerCase().includes(filterText.toLowerCase()) ||
          ticket.sujet.toLowerCase().includes(filterText.toLowerCase())
        : true;
      return matchesPriority && matchesText;
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
      <div className="min-h-screen bg-gray-50 py-10 px-6 font-sans">
        

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Rechercher par N°, Société ou Sujet..."
            className="w-72 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
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

        <div className="overflow-hidden rounded-xl shadow-md border bg-white max-w-6xl mx-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Société</th>
                <th className="px-6 py-4 text-left">Sujet</th>
                <th className="px-6 py-4 text-left">Priorité</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket, index) => (
                  <tr
                    key={ticket.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="px-6 py-4">{ticket.societe}</td>
                    <td className="px-6 py-4">{ticket.sujet}</td>
                    <td className={`px-6 py-4 ${getPriorityColor(ticket.priorite)}`}>
                      {ticket.priorite}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleArchive(ticket.id)}
                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs shadow transition"
                      >
                        <FaTrashAlt /> Archiver
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500">
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
  
function Ticket3() {
  
    const navigate = useNavigate();
    const [filterPriority, setFilterPriority] = useState("");
    const [filterText, setFilterText] = useState("");
    const [tickets, setTickets] = useState([]);
  
    useEffect(() => {
      document.title = "Tickets";
      fetchTickets(); // Fetch tickets when the component mounts
    }, []);
  
    const fetchTickets = async () => {
      try {
        const res = await axios.get('http://localhost:5000/questions/archivee'); // Fetch closed tickets
        setTickets(res.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
  
    const filteredTickets = tickets.filter((ticket) => {
      const matchesPriority = filterPriority ? ticket.priorite === filterPriority : true;
      const matchesText = filterText
        ? ticket.societe.toLowerCase().includes(filterText.toLowerCase()) ||
          ticket.sujet.toLowerCase().includes(filterText.toLowerCase())
        : true;
      return matchesPriority && matchesText;
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
      <div className="min-h-screen bg-gray-50 py-10 px-6 font-sans">
  
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Rechercher par N°, Société ou Sujet..."
            className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          <select
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">Priorité</option>
            <option value="Faible">Faible</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Élevé">Élevé</option>
          </select>
        </div>
  
        <div className="overflow-hidden rounded-lg shadow-md border bg-white max-w-6xl mx-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Société</th>
                <th className="px-6 py-4 text-left">N° Ticket</th>
                <th className="px-6 py-4 text-left">Sujet</th>
                <th className="px-6 py-4 text-left">Priorité</th>
                <th className="px-6 py-4 text-left">Date de Clôture</th>
                <th className="px-6 py-4 text-left">Clôturé par</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{ticket.societe}</td>
                    <td className="px-6 py-4">{`TCK-${String(ticket.id).padStart(3, "0")}`}</td>
                    <td className="px-6 py-4">{ticket.sujet}</td>
                    <td className={`px-6 py-4 ${getPriorityColor(ticket.priorite)}`}>
                      {ticket.priorite}
                    </td>
                    <td className="px-6 py-4">{ticket.dateC ? ticket.dateC : "N/A"}</td>
                    <td className="px-6 py-4">{ticket.email}</td>
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

function Ticket4() {
  const [titre, setTitre] = useState("");
  const [cible, setCible] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

      const fetchUserId = async (cible) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/getUserInfoMail/${encodeURIComponent(cible)}`
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
  
  const idUser = await fetchUserId(cible);
 const idAdmin = localStorage.getItem("id");


    const data = {
      iduser: idUser, 
      idadmin: idAdmin, 
      email: cible,
      sujet: titre,
      message: message,
    };

    try {
      const res = await axios.post("http://localhost:5000/nouvquestion/post", data); // adapte l’URL si besoin
      console.log("Message envoyé avec succès :", res.data);

      // Réinitialisation des champs
      setTitre("");
      setCible("");
      setMessage("");

      // Redirection ou message de succès si besoin
      // navigate("/confirmation"); // facultatif
    } catch (error) {
      console.error("Erreur lors de l’envoi :", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen p-10 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-10 space-y-6 border border-gray-200">
        <h2 className="text-4xl font-bold text-indigo-700 text-center">Créer un Nouveau Message</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Sujet</label>
            <input
              type="text"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              placeholder="Ex: Problème"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Destinataire</label>
            <input
              type="text"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              value={cible}
              onChange={(e) => setCible(e.target.value)}
              placeholder="Ex: client@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Contenu du message</label>
            <textarea
              className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm h-40 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Votre message ici..."
              required
            ></textarea>
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition duration-300"
            >
              Envoyer le Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function Ticket5() {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    document.title = "Tickets";
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const idAdmin = localStorage.getItem("id");
      const response = await axios.get(
        `http://localhost:5000/nouvquestion/getnouvques`
      );
      const filteredData = response.data.filter((item) => item.archive !== "oui");
      const formattedTickets = filteredData.map((item, index) => ({
        id: item.id,
        email: item.email || "Non renseigné",
        sujet: item.sujet || "Sans sujet",
        message: item.message || "Aucun message",
        reponse: item.reponse || "Pas encore de réponse",
        dateC: item.dateC || "",
        numero: `TCK-${String(index + 1).padStart(3, "0")}`,
      }));
      setTickets(formattedTickets);
    } catch (error) {
      console.error("Erreur lors du chargement des tickets :", error);
    }
  };

  const handleReply = (id) => {
    navigate(`/user/contact/rep/${id}`);
  };

  const handleArchive = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/questions/arch/${id}`);
      setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    } catch (error) {
      console.error("Erreur lors de l'archivage :", error);
      alert("Une erreur s'est produite lors de l'archivage.");
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const searchText = filterText.toLowerCase();
    return (
      ticket.numero.toLowerCase().includes(searchText) ||
      ticket.email.toLowerCase().includes(searchText) ||
      ticket.sujet.toLowerCase().includes(searchText) ||
      ticket.message.toLowerCase().includes(searchText) ||
      ticket.reponse.toLowerCase().includes(searchText)||
      ticket.dateC.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-white py-10 px-6 font-sans">
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Rechercher par ticket, email, sujet, message ou réponse..."
          className="w-96 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-xl shadow-md border bg-white max-w-7xl mx-auto">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">N° Ticket</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Sujet</th>
              <th className="px-4 py-3 text-left">Message</th>
              <th className="px-4 py-3 text-left">Réponse</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket, index) => (
                <tr
                  key={ticket.id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="px-4 py-3">{ticket.numero}</td>
                  <td className="px-4 py-3">{ticket.email}</td>
                  <td className="px-4 py-3">{ticket.sujet}</td>
                  <td className="px-4 py-3">{ticket.message}</td>
                  <td className="px-4 py-3">{ticket.reponse}</td>
                  <td className="px-4 py-3">{ticket.dateC}</td>
                  
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

export default function TicketsPage() {
  const [tab, setTab] = useState(1);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-6"></h1>
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-6 py-2 rounded font-bold ${
            tab === 1 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
          }`}
          onClick={() => setTab(1)}
        >
     Suivi des Tickets
        </button>
        
        <button
          className={`px-6 py-2 rounded font-bold ${
            tab === 2 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
          }`}
          onClick={() => setTab(2)}
        >
         Tickets Clôturés

        </button>
        <button
          className={`px-6 py-2 rounded font-bold ${
            tab === 3 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
          }`}
          onClick={() => setTab(3)}
        >
          Archive des Tickets

        </button>





        <button
            className={`px-6 py-2 rounded font-bold ${
            tab === 4 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
          }`}
          onClick={() => setTab(4)}
        >
     nouveau message
        </button>
        <button
            className={`px-6 py-2 rounded font-bold ${
            tab === 5 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
          }`}
          onClick={() => setTab(5)}
        >
          reponse sur mes questions
        </button>



      </div>
      {tab === 1 && <Ticket1 />}
      {tab === 2 && <Ticket2 />}
      {tab === 3 && <Ticket3 />}
      {tab === 4 && <Ticket4 />}
      {tab === 5 && <Ticket5 />}

    </div>
  );
}

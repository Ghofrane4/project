  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { observer } from "mobx-react-lite";
  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { useNavigate } from "react-router-dom";

  const Abonnement = observer(() => {
    const [abonnements, setAbonnements] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchAbonnements = async () => {
        try {
          const response = await axios.get("http://localhost:5000/abonnements");
          setAbonnements(response.data);
        } catch (error) {
          console.error("Erreur lors de la récupération des abonnements:", error);
        }
      };
      fetchAbonnements();
    }, []);

    const handleDelete = (id) => {
      toast.info(
        <div className="text-sm text-gray-700">
          <p className="mb-2">Supprimer définitivement cet abonnement ?</p>
          <button
            onClick={async () => {
              try {
                await axios.delete(`http://localhost:5000/abonnements/${id}`);
                setAbonnements((prev) =>
                  prev.filter((abonnement) => abonnement.id !== id)
                );
                toast.success("Abonnement supprimé avec succès");
              } catch (error) {
                toast.error("Erreur lors de la suppression");
              }
              toast.dismiss();
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
          >
            Confirmer
          </button>
        </div>,
        { autoClose: false, closeOnClick: false }
      );
    };

    const handleEdit = (id) => {
      navigate(`/admin/abonnement/modifierabonnement/${id}`);
    };

    const handleFacture = async (abonnement) => {
      console.log("ClientId: ", abonnement.clientId); // Vérifier si clientId est bien présent
      const today = new Date();
      const dateStr = `${String(today.getDate()).padStart(2, "0")}${String(today.getMonth() + 1).padStart(2, "0")}${today.getFullYear()}`;
      try {
        const data = {
          numero: `F00${abonnement.id}${dateStr}`, 
          date: new Date().toISOString().split('T')[0],
          adresse: abonnement.adresse || "Adresse par défaut",
          date_debut: abonnement.datedeb,
          date_fin: abonnement.datefin,
          prix: abonnement.prix,
        };
    
        await axios.post(`http://localhost:5000/factures/fact/${abonnement.clientId}`, data);
        toast.success("Facture générée avec succès !");
      } catch (error) {
        console.error("Erreur lors de la génération de la facture :", error);
        toast.error("Échec de la génération de la facture !");
      }
    };
    
  
    



    

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 py-10 px-6 font-sans">
        <h1 className="text-4xl text-gray-800 text-center font-bold mb-10">
           Suivi des Abonnements
        </h1>

        <div className="flex justify-center mb-8">
          <a
            href="/admin/abonnement/ajoutabonnement"
            className="bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-6 py-3 rounded-full shadow-lg transition-all duration-300"
          >
            + Ajouter un abonnement
          </a>
        </div>

        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden border border-gray-200 max-w-6xl mx-auto">
          <table className="w-full text-sm text-gray-800">
            <thead className="bg-[#f1f3f5] text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Client</th>
                <th className="px-6 py-4 text-left">Date de début</th>
                <th className="px-6 py-4 text-left">Date de fin</th>
                <th className="px-6 py-4 text-left">Prix</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {abonnements.length > 0 ? (
                abonnements.map((abonnement, index) => (
                  <tr
                    key={abonnement.id}
                    className={`hover:bg-gray-100 transition-all duration-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4">{abonnement.nomclient}</td>
                    <td className="px-6 py-4">{abonnement.datedeb}</td>
                    <td className="px-6 py-4">{abonnement.datefin}</td>
                    <td className="px-6 py-4 font-semibold text-green-700">
                      {abonnement.prix} TND
                    </td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(abonnement.id)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-xs shadow transition"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(abonnement.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-xs shadow transition"
                      >
                        Supprimer
                      </button>
                      <button
                        onClick={() => handleFacture(abonnement)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full text-xs shadow transition"
                      >
                        Facturer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">
                    Aucun abonnement trouvé 📭
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  });

  export default Abonnement;

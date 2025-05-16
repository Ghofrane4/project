import React, { useState } from "react";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const AjoutAbonnement = observer(() => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nomclient: "",
    datedeb: "",
    datefin: "",
    prix: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nomclient || !formData.datedeb || !formData.datefin || !formData.prix) {
      setErrorMessage("Tous les champs sont requis.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/abonnements", formData);
      if (response.status === 201) {
        setSuccessMessage("Abonnement ajouté avec succès !");
        setErrorMessage("");
        setFormData({
          nomclient: "",
          datedeb: "",
          datefin: "",
          prix: "",
        });
        // navigate("/admin/abonnement");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'abonnement:", error);
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-6 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center animate-fade-in-up">
            Ajouter un Abonnement
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Client*</label>
              <input
                type="text"
                name="nomclient"
                value={formData.nomclient}
                placeholder="Nom du client"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Prix*</label>
              <input
                type="number"
                name="prix"
                value={formData.prix}
                placeholder="Prix d'abonnement"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Date début*</label>
              <input
                type="date"
                name="datedeb"
                value={formData.datedeb}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 shadow-sm"
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">Date fin*</label>
              <input
                type="date"
                name="datefin"
                value={formData.datefin}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 shadow-sm"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/abonnement")}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2.5 rounded-xl transition shadow-sm">
              <FaArrowLeft className="text-sm" />
              Retour  
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl transition shadow-md"
            >
              Enregistrer
            </button>
          </div>

          {errorMessage && (
            <div className="mt-4 text-sm text-red-500 font-medium">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="mt-4 text-sm text-green-600 font-medium">{successMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
});

export default AjoutAbonnement;

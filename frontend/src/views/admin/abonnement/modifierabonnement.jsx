import React, { useState, useEffect } from "react";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";

const ModifierAbonnement = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nomclient: "",
    datedeb: "",
    datefin: "",
    prix: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAbonnement = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/abonnements/abon/${id}`);
        const abonnement = response.data;
        const formatDate = (dateString) => dateString.split("T")[0];

        setFormData({
          nomclient: abonnement.nomclient,
          prix: abonnement.prix,
          datedeb: formatDate(abonnement.datedeb),
          datefin: formatDate(abonnement.datefin),
        });
      } catch (error) {
        setErrorMessage("Impossible de charger les données de l'abonnement.");
      }
    };

    fetchAbonnement();
  }, [id]);

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

    setLoading(true);

    try {
      const response = await axios.put(`http://localhost:5000/abonnements/${id}`, formData);

      if (response.status === 200) {
        setSuccessMessage("Abonnement modifié avec succès !");
        setErrorMessage("");
        setTimeout(() => navigate("/admin/abonnement"), 1500);
      }
    } catch (error) {
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-6 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Modifier un Abonnement
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client*</label>
              <input
                type="text"
                name="nomclient"
                value={formData.nomclient}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix*</label>
              <input
                type="number"
                name="prix"
                value={formData.prix}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date début*</label>
              <input
                type="date"
                name="datedeb"
                value={formData.datedeb}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date fin*</label>
              <input
                type="date"
                name="datefin"
                value={formData.datefin}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-xl"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/abonnement")}
              className="bg-gray-200 px-5 py-2 rounded-xl"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600"
              } text-white px-6 py-2 rounded-xl transition duration-300`}
            >
              {loading ? "Modification..." : "Modifier"}
            </button>
          </div>

          {errorMessage && (
            <p className="mt-4 text-red-500 text-sm">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="mt-4 text-green-600 text-sm">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
});

export default ModifierAbonnement;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";

const ModifierFacture = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    numero: "",
    date: "",
    adresse: "",
    date_debut: "",
    date_fin: "",
    prix: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchFacture = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/factures/fac/${id}`);
        const facture = response.data;

        const formatDate = (date) => date ? new Date(date).toISOString().split("T")[0] : "";

        setFormData({
          numero: facture.numero || "",
          date: formatDate(facture.date),
          adresse: facture.adresse || "",
          date_debut: formatDate(facture.date_debut),
          date_fin: formatDate(facture.date_fin),
          prix: facture.prix || "",
        });
      } catch (error) {
        setErrorMessage("Impossible de charger les données de la facture.");
      }
    };

    fetchFacture();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {  numero, date, adresse, date_debut, date_fin, prix } = formData;

    if ( !numero || !date || !adresse || !date_debut || !date_fin || !prix) {
      setErrorMessage("Tous les champs sont requis.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(`http://localhost:5000/factures/upd/${id}`, formData);
      if (response.status === 200) {
        setSuccessMessage("Facture modifiée avec succès !");
        setTimeout(() => navigate("/admin/facture"), 1500);
      }
    } catch (error) {
      setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] py-12 px-6 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white/70 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Modifier une Facture
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Champs existants */}
            <Input label="Numéro*" name="numero" value={formData.numero} onChange={handleInputChange} />
            <Input label="Date*" name="date" value={formData.date} onChange={handleInputChange} type="date" />
            <Input label="Adresse*" name="adresse" value={formData.adresse} onChange={handleInputChange} />

            {/* Nouveaux champs */}
            <Input label="Début*" name="date_debut" value={formData.date_debut} onChange={handleInputChange} type="date" />
            <Input label="Fin*" name="date_fin" value={formData.date_fin} onChange={handleInputChange} type="date" />
            <Input label="Prix*" name="prix" value={formData.prix} onChange={handleInputChange} type="number" />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/facture")}
              className="bg-gray-200 px-5 py-2 rounded-xl"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600"
              } text-white px-6 py-2 rounded-xl`}
            >
              {loading ? "Modification..." : "Modifier"}
            </button>
          </div>
          {errorMessage && <p className="mt-4 text-red-500 text-sm">{errorMessage}</p>}
          {successMessage && <p className="mt-4 text-green-600 text-sm">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
});

// Petit composant Input réutilisable
const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-xl"
    />
  </div>
);

export default ModifierFacture;

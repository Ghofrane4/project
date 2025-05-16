import React, { useState, useEffect } from "react";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "qrcode";
const Facture = observer(() => {
  const [factures, setFactures] = useState([]);
  const [abonnements, setAbonnements] = useState([]);
  const [newFacture, setNewFacture] = useState({
    clientId: "",
    numero: "",
    date: new Date().toISOString().split("T")[0],
    adresse: "",
    date_debut: "",
    date_fin: "",
    prix: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [abonnementsRes, facturesRes] = await Promise.all([
          axios.get("http://localhost:5000/abonnements/client"),
          axios.get("http://localhost:5000/factures"),
        ]);
        setAbonnements(abonnementsRes.data);
        setFactures(facturesRes.data);
        setLoading(false);
      } catch (error) {
        toast.error("Erreur de chargement des données.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchFacture = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/factures/fac/${id}`);
          setNewFacture(response.data);
        } catch (error) {
          toast.error("Erreur lors de la récupération de la facture.");
        }
      };
      fetchFacture();
    } else {
      const factureId = String(factures.length + 1).padStart(3, "0");
      const today = new Date();
      const dateStr = `${String(today.getDate()).padStart(2, "0")}${String(today.getMonth() + 1).padStart(2, "0")}${today.getFullYear()}`;
      const newNumero = `F${factureId}${dateStr}`;
      setNewFacture((prev) => ({
        ...prev,
        numero: newNumero,
        date: today.toISOString().split("T")[0],
      }));
    }
  }, [id, factures.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/factures/${id}`, newFacture);
        toast.success("Facture mise à jour avec succès");
      } else {
        await axios.post("http://localhost:5000/factures", newFacture);
        toast.success("Facture créée avec succès");
      }
      const response = await axios.get("http://localhost:5000/factures");
      setFactures(response.data);
      navigate("/admin/facture/:id");
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement de la facture");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFacture((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    toast.info(
      <div className="text-sm text-gray-700">
        <p className="mb-2">Supprimer définitivement cette facture ?</p>
        <button
          onClick={async () => {
            try {
              await axios.delete(`http://localhost:5000/factures/${id}`);
              setFactures((prev) => prev.filter((facture) => facture.id !== id));
              toast.success("Facture supprimée avec succès");
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


  const handleGeneratePDF = async (facture) => {
    const client = abonnements.find((a) => a.id === facture.clientId);
    const qrData = `
      Facture: ${facture.numero}
      Client: ${client ? client.nomclient : "Client inconnu"}
      Date: ${facture.date}
      Prix: ${facture.prix} DT
    `;
  
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(qrData);
  
      const pdfContent = `
        <html>
          <head>
            <title>Facture</title>
          </head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc;">
            <h1 style="text-align: center; color: #333;">🧾 Facture</h1>
            <p><strong>Client :</strong> ${client ? client.nomclient : "Client inconnu"}</p>
            <p><strong>Numéro :</strong> ${facture.numero}</p>
            <p><strong>Date :</strong> ${facture.date}</p>
            <p><strong>Adresse :</strong> ${facture.adresse}</p>
            <p><strong>Date Début :</strong> ${facture.date_debut}</p>
            <p><strong>Date Fin :</strong> ${facture.date_fin}</p>
            <p><strong>Prix :</strong> ${facture.prix} DT</p>
            <div style="margin-top: 20px; text-align: center;">
              <p><strong>Scan QR pour vérification</strong></p>
              <img id="qr" src="${qrCodeDataUrl}" style="width: 150px; height: 150px;" />
            </div>
          </body>
        </html>
      `;
  
      const newWindow = window.open("", "_blank");
      newWindow.document.open();
      newWindow.document.write(pdfContent);
      newWindow.document.close();
  
      // Attendre que l'image soit bien chargée avant impression
      newWindow.onload = () => {
        const img = newWindow.document.getElementById("qr");
        if (img.complete) {
          newWindow.print();
        } else {
          img.onload = () => newWindow.print();
        }
      };
    } catch (error) {
      toast.error("Erreur lors de la génération du QR code");
    }
  };
  

  if (loading) return <div>Chargement...</div>;
  if (abonnements.length === 0) return <div>Aucun client trouvé</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 py-10 px-6 font-sans">
      <h1 className="text-4xl text-gray-800 text-center font-bold mb-10">Gestion des Factures</h1>

      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden border border-gray-200 max-w-6xl mx-auto">
        <table className="w-full text-sm text-gray-800">
          <thead className="bg-[#f1f3f5] text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Client</th>
              <th className="px-6 py-4 text-left">Numéro</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Adresse</th>
              <th className="px-6 py-4 text-left">Début</th>
              <th className="px-6 py-4 text-left">Fin</th>
              <th className="px-6 py-4 text-left">Prix</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {factures.length > 0 ? (
              factures.map((facture, index) => {
                const client = abonnements.find((a) => a.id === facture.clientId);
                return (
                  <tr
                    key={facture.id}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4">{client ? client.nomclient : "Client inconnu"}</td>
                    <td className="px-6 py-4">{facture.numero}</td>
                    <td className="px-6 py-4">{facture.date}</td>
                    <td className="px-6 py-4">{facture.adresse}</td>
                    <td className="px-6 py-4">{facture.date_debut}</td>
                    <td className="px-6 py-4">{facture.date_fin}</td>
                    <td className="px-6 py-4">{facture.prix} DT</td>
                    <td className="px-6 py-4 flex space-x-2">
                      <button
                        onClick={() => navigate(`/admin/facture/modifierfacture/${facture.id}`)}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(facture.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Supprimer
                      </button>
                      <button
                        onClick={() => handleGeneratePDF(facture)}
                        className="text-green-600 hover:text-green-800"
                      >
                        Imprimer
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  Aucune facture disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default Facture;
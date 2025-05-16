import React, { useEffect, useState } from "react";
import TopCreatorTable from "./components/table";
import axios from "axios";
import { Loader2, AlertCircle } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/products/allpro");
      setProducts(data);
    } catch (err) {
      setError("Impossible de récupérer les produits. Réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);


  const tableColumns = [
    { Header: "Titre", accessor: "title" },
    { Header: "Catégorie", accessor: "productCategory" },
    { Header: "Prix", accessor: "price" },
    { Header: "Stock", accessor: "stock" },
    { Header: "Statut", accessor: "productStatus" },
    { Header: "par qui", accessor: "fullname" },
  ];

  return (
    <div className="p-6 md:p-10">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Produits
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Visualisez et gérez la liste des produits.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300">
            <Loader2 className="animate-spin" size={20} />
            Chargement des produits...
          </div>
        ) : error ? (
          <div className="flex items-center text-red-600 bg-red-100 p-4 rounded-xl mb-4">
            <AlertCircle className="mr-2" />
            {error}
          </div>
        ) : (
          <div className="h-[500px] overflow-y-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <TopCreatorTable
              tableData={products}
              columnsData={tableColumns}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

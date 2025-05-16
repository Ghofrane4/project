import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [openSupplier, setOpenSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetching products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/products/getpy");
        console.log("Data from API:", data); // Log the data received from the API
        
        // Flatten the data and extract products along with the supplier's name
        const flattenedProducts = Object.values(data).map(supplierData => ({
          supplierName: supplierData.fournisseurName,
          products: supplierData.products,
        }));

        setProducts(flattenedProducts);
      } catch (err) {
        console.error("Error fetching products:", err); // Log any error in the fetch
        setError("Impossible de récupérer les produits. Réessayez plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleSupplier = (name) => {
    setOpenSupplier(openSupplier === name ? null : name);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-700";
      case "out of stock":
        return "bg-red-100 text-red-700";
      case "limited":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-10 font-inter bg-slate-100 min-h-screen text-slate-800">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">Gestion des produits fournisseurs</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        // Render products grouped by supplier
        products.length > 0 ? (
          products.map(({ supplierName, products }) => (
            <div
              key={supplierName}
              className="bg-white rounded-2xl p-6 mb-6 shadow-md transition-all duration-300"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSupplier(supplierName)}
              >
                <h2 className="text-xl font-semibold text-blue-800">
                   {supplierName}
                </h2>
                <div
                  className={`text-xl transition-transform ${openSupplier === supplierName ? 'rotate-90' : ''}`}
                >
                  ▶
                </div>
              </div>

              {openSupplier === supplierName && (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full table-auto border-collapse rounded-xl overflow-hidden">
                    <thead className="bg-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-left">Titre</th>
                        <th className="px-4 py-3 text-left">Catégorie</th>
                        <th className="px-4 py-3 text-left">Prix</th>
                        <th className="px-4 py-3 text-left">Stock</th>
                        <th className="px-4 py-3 text-left">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                          <td className="px-4 py-2">{product.title}</td>
                          <td className="px-4 py-2">{product.productCategory}</td>
                          <td className="px-4 py-2">{product.price} TND</td>
                          <td className="px-4 py-2">{product.stock}</td>
                          <td className="px-4 py-2">
                            <span className={`font-semibold px-2 py-1 rounded ${getStatusClass(product.productStatus)}`}>
                              {product.productStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Aucun produit trouvé.</p>
        )
      )}
    </div>
  );
};

export default Products;

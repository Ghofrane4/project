import React, { useState } from "react";
import { MdFileUpload } from "react-icons/md";
import Card from "components/card";
import axios from "axios";
import { useStores } from "stores/StoreProvider";

const Upload = () => {
  const { profileStore } = useStores();

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

    // Function to handle file upload
    const uploadFile = async () => {
      const userId = localStorage.getItem('id'); // Retrieve user ID from localStorage
      if (!selectedFile) {
        alert("Please select a file to upload.");
        return;
      }
  
      setUploading(true);
      const formData = new FormData();
      formData.append("image", selectedFile);
  
      try {
        // Replace 'YOUR_API_ENDPOINT' with the URL of your API endpoint
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/users/update-image/${userId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        console.log("File uploaded successfully:", response.data);
        profileStore.updateProfile(response.data.user);

        alert("File uploaded successfully!");
      } catch (error) {
        console.error("File upload error:", error);
        alert("Failed to upload file. Please try again.");
      } finally {
        setUploading(false);
      }
    };

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0 cursor-pointer"
        >
          <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
          <h4 className="text-xl font-bold text-brand-500 dark:text-white">
            Insérer Image
          </h4>
          <p className="mt-2 text-sm font-medium text-gray-600">
           Les fichiers PNG et JPG sont autorisés
          </p>
        </label>
      </div>

      <div className="col-span-5 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
        <h5 className="text-left text-xl font-bold leading-9 text-navy-700 dark:text-white">
          Insérer votre image.
        </h5>
        <button
          onClick={uploadFile}
          disabled={uploading}
          className="linear mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          {uploading ? "Télécharger..." : "Publier maintenant"}
        </button>
      </div>
    </Card>
  );
};

export default Upload;

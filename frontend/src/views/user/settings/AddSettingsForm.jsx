import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import axios from "axios";
import { useStores } from "stores/StoreProvider";
import { ChromePicker } from "react-color";
import { toast } from "react-toastify";

const AddSettingsForm = observer(({ onClose, isUpdate }) => {
  const { settingsStore } = useStores();
  const [showPrimaryPicker, setShowPrimaryPicker] = useState(false);
  const [showSecondaryPicker, setShowSecondaryPicker] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");
    if (!userId) {
      console.error("User ID not found. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append("PrimaryColor", settingsStore.PrimaryColor);
    formData.append("SecondaryColor", settingsStore.SecondaryColor);
    formData.append("Logo", settingsStore.Logo);
    formData.append("BackgroundImage", settingsStore.BackgroundImage);
    formData.append(
      "AccueilContentPosition",
      settingsStore.AccueilContentPosition
    );
    formData.append("FacebookLink", settingsStore.FacebookLink);
    formData.append("InstagramLink", settingsStore.InstagramLink);
    formData.append("LinkedinLink", settingsStore.LinkedinLink);
    formData.append("TiktokLink", settingsStore.TiktokLink);
    formData.append("YoutubeLink", settingsStore.YoutubeLink);
    formData.append("userId", userId);

    try {
      if (isUpdate) {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/settings/update/${userId}`,
          formData
        );
        if (response.status === 200) {
          settingsStore.updateSettings(response.data);
          settingsStore.updateExist(true);
          await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/settings/display/${userId}`
          );
          toast.success('Les informations de la section "Paramètres" ont été mises à jour avec succès.',{progress: undefined,hideProgressBar:true,position:"bottom-right"}); 

        }
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/settings/add`,
          formData
        );
        if (response.status === 201) {
          settingsStore.updateSettings(response.data);
          settingsStore.updateExist(true);
          await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/settings/display/${userId}`
          );
          toast.success('Les informations de la section "Paramètres" ont été enregistrées avec succès.'
            ,{progress: undefined,hideProgressBar:true,position:"bottom-right"}
          );          
        }
      }
      onClose();
    } catch (err) {
      toast.error(err,{progress: undefined,hideProgressBar:true,position:"bottom-right"}); 

    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Primary Color Picker */}
      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label
            htmlFor="primaryColor"
            className="mb-2 block font-bold text-gray-900"
          >
            Couleur primaire
          </label>
          <div className="flex items-center">
            <div
              className="bg-gray-50 h-10 w-10 cursor-pointer rounded-full border"
              style={{ backgroundColor: settingsStore.PrimaryColor }}
              onClick={() => setShowPrimaryPicker(!showPrimaryPicker)}
            />
            {showPrimaryPicker && (
              <div className="absolute z-50 mt-2 pl-16">
                <ChromePicker
                  color={settingsStore.PrimaryColor}
                  onChange={(color) => {
                    settingsStore.updatePrimaryColor(color.hex);
                  }}
                  onChangeComplete={() => {
                    setShowPrimaryPicker(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>
       

        {/* Secondary Color Picker */}
        <div className="flex-1">
          <label
            htmlFor="secondaryColor"
            className="mb-2 block font-bold text-gray-900"
          >
            Couleur secondaire
          </label>
          <div className="flex items-start">
            <div
              className="bg-gray-50 h-10 w-10 cursor-pointer rounded-full border"
              style={{ backgroundColor: settingsStore.SecondaryColor }}
              onClick={() => setShowSecondaryPicker(!showSecondaryPicker)}
            />
            {showSecondaryPicker && (
              <div className="absolute z-50 mt-2 pl-16">
                <ChromePicker
                  color={settingsStore.SecondaryColor}
                  onChange={(color) => {
                    settingsStore.updateSecondaryColor(color.hex);
                  }}
                  onChangeComplete={() => {
                    setShowSecondaryPicker(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Content Position Input */}
      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label
            htmlFor="contentPosition"
            className="block font-bold text-gray-900"
          >
            Position du contenu
          </label>
          <select
            id="contentPosition"
            defaultValue="center"
            value={settingsStore.AccueilContentPosition}
            onChange={(e) =>
              settingsStore.updateAccueilContentPosition(e.target.value)
            }
            className="bg-gray-50 mt-2 block w-full rounded border px-4 py-2"
          >
            <option value="Centre">Centre</option>
            <option value="Droite">Droite</option>
            <option value="Gauche">Gauche</option>
          </select>
        </div>

        {/* Social Media Links */}
        <div className="flex-1">
          <label
            htmlFor="facebookLink"
            className="block font-bold text-gray-900"
          >
            Lien Facebook
          </label>
          <input
            type="url"
            id="facebookLink"
            value={settingsStore.FacebookLink}
            onChange={(e) => settingsStore.updateFacebookLink(e.target.value)}
            className="bg-gray-50  mt-2 block w-full rounded border px-4 py-2"
          />
        </div>
      </div>

      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label
            htmlFor="instagramLink"
            className="block font-bold text-gray-900"
          >
            Lien Instagram
          </label>
          <input
            type="url"
            id="instagramLink"
            value={settingsStore.InstagramLink}
            onChange={(e) => settingsStore.updateInstagramLink(e.target.value)}
            className="bg-gray-50 mt-2 block w-full rounded border px-4 py-2"
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="linkedinLink"
            className="block font-bold text-gray-900"
          >
            Lien LinkedIn
          </label>
          <input
            type="url"
            id="linkedinLink"
            value={settingsStore.LinkedinLink}
            onChange={(e) => settingsStore.updateLinkedinLink(e.target.value)}
            className="bg-gray-50 mt-2 block w-full rounded border px-4 py-2"
          />
        </div>
      </div>
      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label htmlFor="tiktokLink" className="block font-bold text-gray-900">
          Lien TikTok
          </label>
          <input
            type="url"
            id="tiktokLink"
            value={settingsStore.TiktokLink}
            onChange={(e) => settingsStore.updateTiktokLink(e.target.value)}
            className="bg-gray-50 mt-2 block w-full rounded border px-4 py-2"
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="youtubeLink"
            className="block font-bold text-gray-900"
          >
            Lien YouTube
          </label>
          <input
            type="url"
            id="youtubeLink"
            value={settingsStore.YoutubeLink}
            onChange={(e) => settingsStore.updateYoutubeLink(e.target.value)}
            className="bg-gray-50 mt-2 block w-full rounded border px-4 py-2"
          />
        </div>
      </div>
      {/* Logo Input */}
      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label htmlFor="logo" className="block font-bold text-gray-900">
            Logo
          </label>
          <input
            type="file"
            id="logo"
            onChange={(e) => settingsStore.updateLogo(e.target.files[0])}
            className="bg-gray-50 mt-2  w-full "
          />
        </div>

        {/* Background Image Input */}
        <div className="flex-1">
          <label
            htmlFor="backgroundImage"
            className="block font-bold text-gray-900"
          >
            Image d'arrière-plan
          </label>
          <input
            type="file"
            id="backgroundImage"
            onChange={(e) =>
              settingsStore.updateBackgroundImage(e.target.files[0])
            }
            className="bg-gray-50  mt-2  w-full "
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="mr-2 rounded bg-gray-500 px-4 py-2 text-white"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          {isUpdate ? "Mise à jour" : "Enregistrer"}
        </button>
      </div>
    </form>
  );
});

export default AddSettingsForm;

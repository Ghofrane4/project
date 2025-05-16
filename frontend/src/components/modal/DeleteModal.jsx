import React from "react";
import { observer } from "mobx-react-lite";

const DeleteModal = observer(({ onClose,handleDelete,bodyModal }) => {
  const body= bodyModal??'Êtes-vous sûr de vouloir supprimer cette section ?'
  return (
          <div class="p-4 text-center md:p-5">
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          {body}
            </h3>
            <button
              data-modal-hide="popup-modal"
              onClick={handleDelete}
              type="button"
              class="inline-flex items-center rounded-lg bg-[#F95454] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
            >
              Oui, j'en suis sûr
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              onClick={onClose}
              class="rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 ms-3 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Non, annuler
            </button>
          </div>
  );
});

export default DeleteModal;

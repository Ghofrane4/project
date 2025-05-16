import React, { createContext, useContext } from "react";
import aboutUsStore from "./AboutUsStore";
import contentSectionStore from "./ContentSectionStore";
import settingsStore from "./SettingsStore"
import serviceStore from "./ServiceStore";
import productStore from "./ProductStore";
import contactInformationStore from "./contactInformationStore"
import profileStore from "./ProfileStore"

// Create a context with the stores
const StoreContext = createContext({
  aboutUsStore,
  contentSectionStore,
  settingsStore,
  serviceStore,
  contactInformationStore,
  productStore,
  profileStore
});

// Hook to use stores in components
export const useStores = () => useContext(StoreContext);

// Store Provider component
export const StoreProvider = ({ children }) => {
  return (
    <StoreContext.Provider value={{ aboutUsStore,contentSectionStore,settingsStore,serviceStore,contactInformationStore, productStore, profileStore }}>
      {children}
    </StoreContext.Provider>
  );
};

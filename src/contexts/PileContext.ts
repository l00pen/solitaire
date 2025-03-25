import React, { createContext, useContext } from "react";

// Define the shape of the context
type PileContextType = {
  width: number;
};

// Create the context with an undefined default value
const PileContext = createContext<PileContextType | undefined>(undefined);

// Custom hook to use the context safely
export const usePileContext = () => {
  const context = useContext(PileContext);
  if (!context) {
    throw new Error(
      "usePileContext must be used within a PileContext.Provider"
    );
  }
  return context;
};

export default PileContext;

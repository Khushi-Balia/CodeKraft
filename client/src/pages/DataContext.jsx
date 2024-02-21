// AnalysisContext.js
import React, { createContext, useContext, useState } from "react";

const AnalysisContext = createContext();

export const useAnalysisContext = () => {
  return useContext(AnalysisContext);
};

export const AnalysisProvider = ({ children }) => {
  const [analysisResults, setAnalysisResults] = useState({
    code: "",
    pseudocode: "",
    description: "",
    similarity_score: "",
  });

  const [isFetching, setIsFetching] = useState(false);

  const setResults = (results) => {
    setAnalysisResults(results);
  };

  const setFetching = (fetching) => {
    setIsFetching(fetching);
  };

  return (
    <AnalysisContext.Provider
      value={{ analysisResults, isFetching, setResults, setFetching }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

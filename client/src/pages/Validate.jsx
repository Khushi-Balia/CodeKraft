import React from "react";
import { useAnalysisContext } from "./DataContext";

const Validate = () => {
  const { analysisResults } = useAnalysisContext();
  const { description, similarity_score, code, language , metrics } = analysisResults;

  return (
    <div className="projects-container">
      <h1 className="validation-text">Validation</h1>
      <div className="code-runner-container pb-10">
        {/* Example for Python */}
        <code-runner language={language} className="code-runner-spacing pb-10 mb-9">
          {analysisResults.code}
        </code-runner>

        <br />

        {/* Example for SQLite */}
        {/* <code-runner language={language} className="code-runner-spacing">
          SELECT * FROM table_name;
        </code-runner> */}
      </div>
    </div>
  );
};

export default Validate;

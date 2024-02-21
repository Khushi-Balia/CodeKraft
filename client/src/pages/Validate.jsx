import React from "react";
import { useAnalysisContext } from "./DataContext";

const Validate = () => {
  const { analysisResults } = useAnalysisContext();

  return (
    <div className="projects-container">
      <h1 className="validation-text">Validation</h1>
      <div className="code-runner-container">
        {/* Example for Python */}
        <code-runner language="python" className="code-runner-spacing">
          {analysisResults.code}
        </code-runner>

        <br />

        {/* Example for SQLite */}
        <code-runner language="sqlite" className="code-runner-spacing">
          SELECT * FROM table_name;
        </code-runner>
      </div>
    </div>
  );
};

export default Validate;

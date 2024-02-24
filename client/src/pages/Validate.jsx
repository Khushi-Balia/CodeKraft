import React from "react";
import { useAnalysisContext } from "./DataContext";

const Validate = () => {
  const { analysisResults } = useAnalysisContext();
  const { description, similarity_score, code, language , metrics } = analysisResults;

  return (
    <div className="projects-container">
      <h1 className="validation-text">Validation</h1>
      <div className="code-runner-container">
        {/* Example for Python */}
        <pre style={{
              width: '100%',
              overflow: 'auto',
              height: '500px',
              maxHeight: '500px',
              wordBreak: 'break-word',
              margin: '0',
            }}><code-runner language={language} className="code-runner-spacing pb-10 mb-9">
          {analysisResults.code}
        </code-runner>
        </pre>
        <br />

      </div>
    </div>
  );
};

export default Validate;

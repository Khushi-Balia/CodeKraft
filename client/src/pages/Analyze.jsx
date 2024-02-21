import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAnalysisContext } from "./DataContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  coy,
  dark,
  okaidia,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const Analyze = () => {
  const { analysisResults } = useAnalysisContext();
  const { description, similarity_score, code } = analysisResults;
  const [analysisCode, setResults] = useState({
    code: "",
  });
  const [showSimilarityTooltip, setShowSimilarityTooltip] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/eval', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( analysisResults ),
      });
      console.log(analysisResults);
      


      if (!response.ok) {
        throw new Error('Failed to analyze the essay');
      }

      try {
        const analysisCode = await response.json();
        setResults(analysisCode);
        console.log(analysisCode.code);
        

        
      } catch (error) {
        console.error('Failed to parse response JSON', error);
        // Handle error, show a message, etc.
      }
    } catch (error) {
      console.error(error);
      // Handle error, show a message, etc.
    }
  };

  return (
    <div className="Login-container">
      <div className="box1 mt-12">
      <h1 className="text-center text-xl text-white">
         Code generated and its explanation
        </h1>
        <AiTextBox2
          title="Input"
          content={
            <SyntaxHighlighter language="python" style={coy}>
              {code}
            </SyntaxHighlighter>
          }
          height="270px"
        />    
        <button
          className="button1"
          type="submit"
          style={{
            alignItems: "center",
            alignSelf: "center",
            alignContent: "center",
            marginLeft: "200px",
            width: "200px",
          }}
          onClick={handleSubmit}
        >
          Generate report
        </button>    
        <AiTextBox4
          title="Explanation"
          content={
            <pre className="text-white">
              <code className="lang-css python text-white">{description}</code>
            </pre>
          }
          height="205px"
        />
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
                
        <br/><br/>
      </div>
      <div className="box mt-12">
        <h1 className="text-center text-xl text-white">
          Analysis of the code
        </h1>
        <AiTextBox4
          title="Similarity Score"
          content={similarity_score}
          height="160px"
        />{" "}
        <div className="tooltip">
          <span className="question-mark">?</span>
          <div className="tooltip-content">
            The similarity score, ranging from 0 to 1, measures how closely the
            code aligns with the expected solution based on the prompt. A score
            over 0.7 suggests a robust and well-structured implementation.
            <br />
            <br />
            Performance metrics assess key attributes like space and time
            complexity, derived from testing against unit tests. You can use
            these insights to optimize code for improved execution speed and
            memory usage.
          </div>
        </div>
        
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        
        <AiTextBox2
          title="Performance metrics"
          
          content={<SyntaxHighlighter language="c" style={coy}>
          {analysisCode.code}
        </SyntaxHighlighter>}
        height="400px"
        />
        
      </div>
    </div>
  );
};

const AiTextBox3 = ({ title, content, onChange }) => {
  return (
    <div className="ai-text-box3">
      <h2>{title}</h2>
      <div className="ai-content3">
        <textarea
          className="ai-input"
          value={content}
          onChange={onChange}
          placeholder="Enter something..."
        />
      </div>
    </div>
  );
};

const AiTextBox2 = ({ title, content, height }) => {
  return (
    <div className="ai-text-box3" style={{ height: height }}>
      <h2>{title}</h2>
      <div className="ai-content2">{content}</div>
    </div>
  );
};

const AiTextBox4 = ({ title, content, height }) => {
  return (
    <div className="ai-text-box4" style={{ height: height }}>
      <h2>{title}</h2>
      <div className="ai-content">
        <pre className="text-white custom-scrollbar">
          <code className="lang-css python text-white">{content}</code>
        </pre>
      </div>
    </div>
  );
};

export default Analyze;

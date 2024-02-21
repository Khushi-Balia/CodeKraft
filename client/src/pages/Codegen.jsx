import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAnalysisContext } from "./DataContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  coy,
  dark,
  okaidia,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios";

const Codegen = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { analysisResults, setResults, setFetching } = useAnalysisContext();

  const [formData, setFormData] = useState({
    prompt: "",
    database_schema: "",
    template: "",
  });

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetching(true);

    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),

      });

      if (!response.ok) {
        // console.log(formData)
        throw new Error("Failed to analyze the essay");
      }

      try {
        const analysisResults = await response.json();
        setResults(analysisResults);
        console.log(analysisResults);
      } catch (error) {
        console.error("Failed to parse response JSON", error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="container">
      <aside className="sidemenu">
        <div className="tabs">
          <button
            onClick={() => handleTabClick(1)}
            className={activeTab === 1 ? "active" : ""}
          >
            Text Prompt
          </button>
          <button
            onClick={() => handleTabClick(2)}
            className={activeTab === 2 ? "active" : ""}
          >
            Database Schema
          </button>
          <button
            onClick={() => handleTabClick(3)}
            className={activeTab === 3 ? "active" : ""}
          >
            Template
          </button>
        </div>
        <section>
          <TextBox
            className="section1"
            title="Text Prompt"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
            placeholder="prompt"
            active={activeTab === 1}
          />
          <TextBox
            title="Database Schema"
            name="database_schema"
            value={formData.database_schema}
            onChange={handleChange}
            placeholder="database schema"
            active={activeTab === 2}
          />
          <TextBox
            title="Template"
            name="template"
            value={formData.template}
            placeholder="template"
            onChange={handleChange}
            active={activeTab === 3}
          />
          <button onClick={handleSubmit}>Generate Code</button>
        </section>
      </aside>
      <section className="ai-section">
        <br />
        <br />
        <AiTextBox
          title="Code"
          content={
            <SyntaxHighlighter language="python" style={okaidia}>
              {analysisResults.code}
            </SyntaxHighlighter>
          }
        />
        <br />
        <br />
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
          title="Pseudocode"
          content={
            <SyntaxHighlighter language="markdown" style={coy}>
              {analysisResults.pseudocode}
            </SyntaxHighlighter>
          }
        />
        <div>
          <span>
            <br />

            <Link
              to={{
                pathname: "/analyze",
                state: {
                  description: analysisResults.description,
                  similarityScore: analysisResults.similarity_score,
                  code: analysisResults.code,
                },
              }}
              className="button1"
            >
              Analyze
            </Link>

            <Link to="/validate" className="button1">
              Validate
            </Link>
          </span>
        </div>
      </section>
    </div>
  );
};

const TextBox = ({ title, placeholder, active, name, value, onChange }) => {
  const handleInputChange = (e) => {
    onChange(e);
  };

  return (
    <div
      className={`text-box ${active ? "active" : ""}`}
      style={{
        width: "400px",
        height: "300px",
        marginBottom: "10px",
        marginTop: "-10px",
      }}
    >
      <h2>{title}</h2>
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
    </div>
  );
};

const AiTextBox = ({ title, content }) => {
  return (
    <div className="ai-text-box">
      <h2>{title}</h2>
      <div className="ai-content">{content}</div>
    </div>
  );
};

const AiTextBox2 = ({ title, content }) => {
  return (
    <div className="ai-text-box2">
      <h2>{title}</h2>
      <div className="ai-content2">{content}</div>
    </div>
  );
};

export default Codegen;

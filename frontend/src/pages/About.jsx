import React, { useState } from "react";
const About = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
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
            Input JSON
          </button>
          <button
            onClick={() => handleTabClick(3)}
            className={activeTab === 3 ? "active" : ""}
          >
            Database Scheme
          </button>
        </div>
        <section className="bar1">
          <TextBox
            title="Text Prompt"
            placeholder="Enter text prompt"
            active={activeTab === 1}
          />
          <TextBox
            title="Input JSON"
            placeholder="Enter JSON input"
            active={activeTab === 2}
          />
          <TextBox
            title="Database Scheme"
            placeholder="Enter database scheme"
            active={activeTab === 3}
          />
        </section>
      </aside>
      <section className="ai-section">
        <br />
        <br />
        <AiTextBox
          title="AI Output 2"
          content={
            <pre className="text-white">
              <code className="lang-css python text-white">
                {`* {
  Definition: Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to mimic human cognitive functions such as learning, problem-solving, reasoning, perception, and decision-making.

  Types of AI:
  
  Narrow AI: Also known as Weak AI, Narrow AI is designed to perform specific tasks within a limited domain. Examples include virtual assistants like Siri and Alexa, recommendation systems, and image recognition algorithms.
  General AI: Also known as Strong AI or Artificial General Intelligence (AGI), General AI would possess human-like cognitive abilities and be capable of understanding and learning any intellectual task that a human can. This level of AI has not yet been achieved and remains a theoretical concept.
  Applications:
  
  Healthcare: AI is used for medical image analysis, drug discovery, personalized treatment recommendations, and virtual health assistants.
  Finance: AI algorithms are used for fraud detection, algorithmic trading, credit scoring, and customer service chatbots.
  Autonomous Vehicles: AI powers self-driving cars and drones, enabling them to perceive their environment, make decisions, and navigate safely.
  Natural Language Processing (NLP): AI technologies enable language translation, sentiment analysis, chatbots, and virtual assistants.
}
`}
              </code>
            </pre>
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
          title="AI Output 1"
          content="Output/description of the code will be displayed here"
        />
        <div>
          <span>
            <button className="button1">Analyse</button>
            <button className="button1">Validate</button>
          </span>
        </div>
      </section>
    </div>
  );
};

const TextBox = ({ title, placeholder, active }) => {
  return (
    <div
      className={`text-box ${active ? "active" : ""}`}
      style={{
        width: "400px",
        height: "300px",
        marginBottom: "100px",
        marginTop: "-90px",
      }}
    >
      <h2>{title}</h2>
      <textarea placeholder={placeholder}></textarea>
    </div>
  );
};

const AiTextBox = ({ title, content }) => {
  return (
    <div className="ai-text-box">
      <h2>{title}</h2>
      <div className="ai-content">
        <pre className="text-white custom-scrollbar">
          <code className="lang-css python text-white">{content}</code>
        </pre>
      </div>
    </div>
  );
};

const AiTextBox2 = ({ title, content }) => {
  return (
    <div className="ai-text-box2">
      <h2>{title}</h2>
      <div className="ai-content2">
        <pre className="text-black">
          <code className="lang-css python text-black">{content}</code>
        </pre>
      </div>
    </div>
  );
};

export default About;
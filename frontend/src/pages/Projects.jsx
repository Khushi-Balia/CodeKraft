import React from 'react';

const Projects = () => {
  return (
    <div className="projects-container">
      <h1 className="validation-text">Validation</h1>
      <div className="code-runner-container">
        {/* Example for Python */}
        <code-runner language="python" className="code-runner-spacing">
          print('hello world')
        </code-runner>

        <br/>

        {/* Example for SQLite */}
        <code-runner language="sqlite" className="code-runner-spacing">
          SELECT * FROM table_name;
        </code-runner>
      </div>
    </div>
  );
};

export default Projects;


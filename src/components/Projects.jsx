import React from "react";
import "../style/Projects.css"; 

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "AI-Powered Web Application",
      description: "Full-stack application with machine learning integration"
    },
    {
      id: 2,
      title: "React Audio Visualizer",
      description: "Real-time audio analysis and frequency visualization system"
    },
    {
      id: 3,
      title: "Cloud Infrastructure Automation",
      description: "DevOps pipeline with automated deployment and monitoring"
    }
  ];

  const handleGoClick = (projectId) => {
    console.log(`Navigate to project ${projectId}`);
    // Add navigation logic here
  };

  return (
    <div className="projects-container">
      <div className="projects-content">
        <h2>Projects</h2>
        <div className="projects-list">
          {projects.map((project) => (
            <div key={project.id} className="project-item">
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <button 
                className="go-button"
                onClick={() => handleGoClick(project.id)}
              >
                Go
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
import React from "react";
import "../style/Projects.css"; 

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "NASA Psyche Mission: Core Informant",
      description: "A public-facing simulation made in Unity for the NASA Psyche mission, featuring a 3D model of the asteroid and interactive elements."
    },
    {
      id: 2,
      title: "Lava Lakes of the World (coming soon)",
      description: "A vanilla JavaScript project that provides information about the current lava lakes around the world."
    },
    {
      id: 3,
      title: "Dynamic Jeopardy (coming soon)",
      description: "A Dynamic Jeopardy web application built in Vue that allows for a customized amount of players and categories, with a live scoreboard and remote API integration."
    }
  ];

  const handleGoClick = (projectId) => {
    console.log(`Navigate to project ${projectId}`);
    
    if (projectId === 1) {
      // Navigate to NASA Psyche Mission project
      window.open('https://psyche.ssl.berkeley.edu/get-involved/capstone-projects/capstone-projects-iridium-class/m-type-asteroid-sampling-simulator-asu-d/', '_blank');
    } else {
      // Add navigation logic for other projects here
      console.log(`Project ${projectId} navigation not yet implemented`);
    }
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
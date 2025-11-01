import React from "react";
import { FaGithub } from "react-icons/fa";
import "../style/Projects.css"; 

const Projects = () => {
  const projects = [
    {
      id: 4,
      title: "Analyze This",
      description: `Analyze This is a comprehensive React + Vite web application for musicians, producers, and music enthusiasts to analyze songs with professional-grade tools. Get instant musical insights including key detection, BPM analysis, MIDI generation, and more — all processed locally in your browser.\n\nPowered by Essentia.js and enhanced with cloud storage, user authentication, and interactive MIDI previews.`,
      link: "https://analyzethis.io"
    },
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
    } else if (projectId === 4) {
      window.open('https://analyzethis.io', '_blank');
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
              <div className="project-buttons-group">
                <button 
                  className="go-button"
                  onClick={() => handleGoClick(project.id)}
                  disabled={!project.link && project.id !== 1}
                >
                  Go
                </button>
                {/* GitHub README button for Analyze This and NASA Psyche Mission */}
                {(project.id === 4 || project.id === 1) && (
                  <a
                    className="github-readme-link"
                    href={
                      project.id === 4
                        ? 'https://github.com/mdoran3/analyze-this/blob/main/README.md'
                        : 'https://github.com/MissionToPsyche-Iridium/iridium_22d_m-type_sim-se/blob/main/README.md'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View GitHub README"
                  >
                    <FaGithub style={{ width: 28, height: 28, verticalAlign: 'middle' }} aria-label="GitHub" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
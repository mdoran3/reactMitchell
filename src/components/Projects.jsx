import React from "react";
import { FaGithub } from "react-icons/fa";
import "../style/Projects.css"; 

const Projects = () => {
  const projects = [
    {
      id: 5,
      title: "Recommend That",
      year: 2026,
      description: "A Retrieval-Augmented Generation (RAG) system for music recommendation that uses semantic search to match plain-English queries (like \"something melancholic for a rainy Sunday\") to songs from an 820-song catalog. Built with Python, Streamlit, and the all-MiniLM-L6-v2 sentence transformer model, it ranks tracks by cosine similarity and supports optional genre filtering."
    },
    {
      id: 6,
      title: "Mesón Server Education",
      year: 2026,
      description: "A mobile-first web app that helps restaurant servers master Mesón's wine, tapas, fish, sherry, and other offerings through interactive reviews and randomized quizzes. Covers wines by the glass and bottle with pronunciation audio, a 72-item tapas menu with dietary filters, a fish program with comparative scatter charts, sherry education, holiday menus, and a comprehensive allergen guide. Built with React 19, Vite, and React Router v7, deployed on Cloudflare Workers with static JSON bundled at build time for fast mobile performance.",
      link: "https://mesoneducation.com"
    },
    {
      id: 4,
      title: "Analyze This",
      year: 2025,
      description: `Analyze This is a comprehensive React + Vite web application for musicians, producers, and music enthusiasts to analyze songs with professional-grade tools. Get instant musical insights including key detection, BPM analysis, MIDI generation, and more — all processed locally in your browser.\n\nPowered by Essentia.js and enhanced with cloud storage, user authentication, and interactive MIDI previews.`,
      link: "https://analyzethis.io"
    },
    {
      id: 1,
      title: "NASA Psyche Mission: Core Informant",
      year: 2024,
      description: "A public-facing simulation made in Unity for the NASA Psyche mission, featuring a 3D model of the asteroid and interactive elements."
    },
    {
      id: 2,
      title: "Lava Lakes of the World",
      year: 2024,
      description: "A vanilla JavaScript project that provides information about the current lava lakes around the world."
    },
    {
      id: 3,
      title: "Book Cloud",
      year: 2024,
      description: "An admin control panel for an online bookstore, built as a Java application backed by a MySQL relational database. Uses JDBC to bridge Java and MySQL Workbench, providing a command-line interface for managing books, users, and orders."
    }
  ];

  const handleGoClick = (projectId) => {
    console.log(`Navigate to project ${projectId}`);
    
    if (projectId === 1) {
      // Navigate to NASA Psyche Mission project
      window.open('https://psyche.ssl.berkeley.edu/get-involved/capstone-projects/capstone-projects-iridium-class/m-type-asteroid-sampling-simulator-asu-d/', '_blank');
    } else if (projectId === 4) {
      window.open('https://analyzethis.io', '_blank');
    } else if (projectId === 6) {
      window.open('https://mesoneducation.com', '_blank');
    } else {
      // Add navigation logic for other projects here
      console.log(`Project ${projectId} navigation not yet implemented`);
    }
  };

  return (
    <div className="projects-container modern">
      <div className="projects-content">
        <span className="projects-eyebrow">Selected work · 2024–2026</span>
        <h2>Projects</h2>
        <div className="projects-list">
          {projects.map((project) => (
            <div key={project.id} className="project-item">
              <div className="project-header">
                <h3>{project.title}</h3>
                {project.year && <span className="project-year">{project.year}</span>}
              </div>
              <div className="project-body">
                <div className="project-info">
                  <p>{project.description}</p>
                </div>
                <div className="project-buttons-group">
                {(project.id === 1 || project.id === 4 || project.id === 6) && (
                  <button
                    className="go-button"
                    onClick={() => handleGoClick(project.id)}
                  >
                    Go
                  </button>
                )}
                {(project.id === 4 || project.id === 1 || project.id === 2 || project.id === 3 || project.id === 5 || project.id === 6) && (
                  <a
                    className="github-readme-link"
                    href={
                      project.id === 4
                        ? 'https://github.com/mdoran3/analyze-this/blob/main/README.md'
                        : project.id === 1
                        ? 'https://github.com/MissionToPsyche-Iridium/iridium_22d_m-type_sim-se/blob/main/README.md'
                        : project.id === 5
                        ? 'https://github.com/mdoran3/applied_ai_music_recommender_system'
                        : project.id === 3
                        ? 'https://github.com/mdoran3/BookCloud'
                        : project.id === 6
                        ? 'https://github.com/mdoran3/wine_study'
                        : 'https://github.com/mdoran3/lavaLakes'
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
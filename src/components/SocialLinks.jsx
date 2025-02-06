import React from "react";
import "../style/SocialLinks.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const SocialLinks = () => (
  <div className="social-links">
    <a href="https://github.com/mdoran3" target="_blank" rel="noreferrer" title="GitHub">
      <FaGithub />
    </a>
    <a
      href="https://www.linkedin.com/in/mitchell-d-dev"
      target="_blank"
      rel="noreferrer"
      title="LinkedIn"
    >
      <FaLinkedin />
    </a>
  </div>
);

export default SocialLinks;
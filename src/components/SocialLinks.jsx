import React from "react";
import "../style/SocialLinks.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import OrigamiFlower from "./OrigamiFlower";
import SoundWave from "./SoundWave";

const SocialLinks = () => (
  <div className="social-links">
    {/* <OrigamiFlower width={500} height={500} /> */}
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
    <SoundWave />
  </div>
);

export default SocialLinks;
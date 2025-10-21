// import React, { useEffect } from "react";
// import * as Tone from "tone";
// import { color, motion } from "framer-motion";
// import { Typewriter } from "react-simple-typewriter";
// import synthImage from "../assets/images/synth-image.png"; 
// import projectImage from "../assets/images/projects.png";
// import travelImage from "../assets/images/synth-image.png"; 

// const Synth = ({ onClose, currentTab }) => {
//   useEffect(() => {
//     const synth = new Tone.Synth().toDestination();

//     const playTune = async () => {
//       await Tone.start();
//       synth.triggerAttackRelease("C4", "8n");
//       setTimeout(() => synth.triggerAttackRelease("E4", "8n"), 300);
//       setTimeout(() => synth.triggerAttackRelease("G4", "8n"), 600);
//     };

//     //playTune();
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.8 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         zIndex: 9999,
//         backgroundColor: "rgba(0, 0, 0, 0.8)",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         paddingTop: "6vh",   
//         paddingBottom: "6vh", 
//         boxSizing: "border-box",
//       }}
//     >
//       <div style={{ position: "relative", textAlign: "center" }}>
//         {/* Synth Image */}
//         <img
//           src={synthImage}
//           alt="Synthesizer"
//           style={{
//             maxWidth: "80vw",
//             maxHeight: "70vh",
//             height: "auto",
//             borderRadius: "1rem",
//             boxShadow: "0 0 30px #0ff",
//             display: "block",
//             margin: "0 auto",
//           }}
//         />

//         {/* Typewriter Overlay */}
//         <div
//           style={{
//             position: "absolute",
//             top: "10%",
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: "80%", 
//             backgroundColor: "rgba(0, 0, 0, 0.6)",
//             color: "#00FF00",
//             fontFamily: "'Courier New', Courier, monospace",
//             fontSize: "1.5rem",
//             textShadow: "0 0 2px #00FF00, 0 0 4px #00FF00, 0 0 6px #00AA00",
//             padding: "1rem",
//             borderRadius: "0.5rem",
//             textAlign: "center",
//             zIndex: 10,
//           }}
//         >
//           <Typewriter
//             words={["Welcome to Mitchell D.'s world of Earth, code, and audio."]}
//             typeSpeed={100}
//             cursor
//           />
//           <span className="cursor"></span>
//         </div>

//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           style={{
//             position: "absolute",
//             top: "-1.5rem",
//             right: "-1.5rem",
//             color: "#000",
//             background: "#0ff",
//             border: "none",
//             borderRadius: "50%",
//             width: "2.5rem",
//             height: "2.5rem",
//             cursor: "pointer",
//             fontWeight: "bold",
//             boxShadow: "0 0 10px #0ff",
//           }}
//         >
//           X
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// export default Synth;

import React, { useEffect } from "react";
import * as Tone from "tone";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

// Images for each tab
import synthImage from "../assets/images/synth-image.png";
import projectImage from "../assets/images/projects.png";
import travelImage from "../assets/images/world.png"; // Replace with real travel image
import audioImage from "../assets/images/audio.png";   // Replace with real music image

// Track which tabs have already shown their popup
let shownTabs = [];

const Synth = ({ onClose, currentTab }) => {
  useEffect(() => {
    const synth = new Tone.Synth().toDestination();

    const playTune = async () => {
      await Tone.start();
      synth.triggerAttackRelease("C4", "8n");
      setTimeout(() => synth.triggerAttackRelease("E4", "8n"), 300);
      setTimeout(() => synth.triggerAttackRelease("G4", "8n"), 600);
    };

    //playTune();
  }, []);

  // Check if this tab has already shown its popup
  useEffect(() => {
    if (currentTab && shownTabs.includes(currentTab)) {
      // Tab already shown, close immediately
      onClose();
    } else if (currentTab) {
      // Add this tab to the shown list
      shownTabs.push(currentTab);
    }
  }, [currentTab, onClose]);

  // Dynamic content based on current tab
  const getContent = (tab) => {
    switch (tab) {
      case "travel":
        return {
          image: travelImage,
          text: ["Have a look at some of my shots from around the world."],
        };
      case "projects":
        return {
          image: projectImage,
          text: ["Explore my favorite coding projects and experiments."],
        };
      case "music":
        return {
          image: audioImage,
          text: ["Discover my sounds and music."],
        };
      default:
        return {
          text: ["Welcome to Mitchell D.'s world of Earth, code, and audio."],
        };
    }
  };

  const { image, text } = getContent(currentTab);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "6vh",
        paddingBottom: "6vh",
        boxSizing: "border-box",
      }}
    >
      <div style={{ position: "relative", textAlign: "center" }}>
        {/* Dynamic Image */}
        <img
          src={image}
          alt="Synthesizer"
          style={{
            maxWidth: "80vw",
            maxHeight: "70vh",
            height: "auto",
            borderRadius: "1rem",
            boxShadow: "0 0 30px #0ff",
            display: "block",
            margin: "0 auto",
          }}
        />

        {/* Typewriter Overlay */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "1.5rem",
            color: "#0ff",
            textShadow: "0 0 4px #0ff, 0 0 8px #0ff, 0 0 12px #00ffff",
            padding: "1rem",
            borderRadius: "0.5rem",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <Typewriter words={text} typeSpeed={100} cursor />
          <span className="cursor"></span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-1.5rem",
            right: "-1.5rem",
            color: "#000",
            background: "#0ff",
            border: "none",
            borderRadius: "50%",
            width: "2.5rem",
            height: "2.5rem",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 0 10px #0ff",
          }}
        >
          X
        </button>
      </div>
    </motion.div>
  );
};

export default Synth;
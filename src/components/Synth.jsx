import React, { useEffect } from "react";
import * as Tone from "tone";
import { color, motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import synthImage from "../assets/images/synth-image.png"; // Adjust path if needed

const Synth = ({ onClose }) => {
  useEffect(() => {
    const synth = new Tone.Synth().toDestination();

    const playTune = async () => {
      await Tone.start();
      synth.triggerAttackRelease("C4", "8n");
      setTimeout(() => synth.triggerAttackRelease("E4", "8n"), 300);
      setTimeout(() => synth.triggerAttackRelease("G4", "8n"), 600);
    };

    playTune();
  }, []);

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
      }}
    >
      <div style={{ position: "relative", maxWidth: "90vw", width: "100%" }}>
        {/* Synth Image */}
        <img
          src={synthImage}
          alt="Synthesizer"
          style={{
            width: "100%",
            maxHeight: "80vh",
            borderRadius: "1rem",
            boxShadow: "0 0 30px #0ff",
          }}
        />

        {/* Typewriter Overlay */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%", // Make this smaller than 100% to stay within image
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "#00FF00",
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: "1.5rem",
            textShadow: "0 0 2px #00FF00, 0 0 4px #00FF00, 0 0 6px #00AA00",
            padding: "1rem",
            borderRadius: "0.5rem",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <Typewriter
            words={["Welcome to Mitchell D.'s world of code & sound."]}
            typeSpeed={100}
            cursor
          />
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
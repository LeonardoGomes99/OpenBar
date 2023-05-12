import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {

  function openExecutable() {
    invoke("open_executable", {
      path: "C:\\Program Files (x86)\\Steam\\steam.exe"
    });
  }

  return (
    <div className="container">      
      <div className="row">
        <a onClick={openExecutable}>
          <img src="/steam.svg" className="logo steam" alt="Steam Logo" />
        </a>        
      </div>      
    </div>
  );
}

export default App;

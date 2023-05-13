import { Fragment, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

import { listen } from '@tauri-apps/api/event'

import { trace, info, error, attachConsole } from "tauri-plugin-log-api";

// with LogTarget::Webview enabled this function will print logs to the browser console
const detach = await attachConsole();

function App() {

  const [icons, setIcons] = useState([])

  const openExecutable = (path: any) => {
    invoke("open_executable", {
      path: path
    });
  }

  useEffect(() => {
    const printFile = async () => {
      let json = await invoke("open_file") as any;
      setIcons(JSON.parse(json))
    }
    printFile()
  }, [])

  return (
    <div className="container">
      <div className="row">        
        {
          icons.map((x: any) => {
            return (
              <Fragment>
                <a onClick={() => openExecutable(x?.path)}>
                  <img src={`/${x.icon}`} className="logo steam" alt="Steam Logo" />
                </a>
              </Fragment>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;

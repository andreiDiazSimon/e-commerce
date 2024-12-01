import "./styles/Home.css";
import HomeUiWorker from "./HomeUiWorker";
import ProfileWorker from "./ProfileWorker";
import Browse from "./Browse";

import { useState } from "react";
export default function MainWorker() {
  //for triggering components base on clicked element in navbar
  let [showIto, setShowIto] = useState("home");
  return (
    <div className="w-full">
      {/* navbar Container */}
      <div className="flex justify-evenly items-center bg-gradient-to-r from-[#171717] to-[#444444] w-full">
        <div className="flex justify-center items-center mr-[500px]">
          <div className="w-[90px] h-[90px] bg-[url('./assets/logo.png')] bg-contain bg-no-repeat bg-center transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
        </div>

        {/* navbar content */}
        <div className="flex gap-[90px] font-mono text-[1rem] italic ">
          <div
            className="nav-item cursor-pointer"
            onClick={() => setShowIto("home")}
          >
            HOME
          </div>
          <div
            className="nav-item cursor-pointer"
            onClick={() => setShowIto("browse")}
          >
            BROWSE
          </div>
          <div
            className="nav-item cursor-pointer"
            onClick={() => setShowIto("profile")}
          >
            PROFILE
          </div>
          <div className="nav-item cursor-pointer">CHAT</div>
          <div className="nav-item cursor-pointer">CONTACT</div>
        </div>
      </div>
      {showIto == "home" && <HomeUiWorker />}
      {showIto == "profile" && <ProfileWorker />}
      {showIto == "browse" && <Browse />}
    </div>
  );
}

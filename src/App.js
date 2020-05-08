import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import PreGame from "./pages/PreGame";
import Lobby from "./pages/Lobby";
import RoleAssign from "./pages/RoleAssign";
import SleepAction from "./pages/SleepAction";
import MafiaAction from "./pages/MafiaAction";
import DetectiveAction from "./pages/DetectiveAction";
import DoctorAction from "./pages/DoctorAction";
import DetectiveInvestigation from "./pages/DetectiveInvestigation";
import MafiaKill from "./pages/MafiaKill";
import DoctorSave from "./pages/DoctorSave";
import DayPhase from "./pages/DayPhase";
import DayVoting from "./pages/DayVoting";
import WinVillager from "./pages/WinVillager";
import WinMafia from "./pages/WinMafia";

const socket = socketIOClient("https://mafia-backend.now.sh:5000");

const App = () => {
  const [error, setError] = useState();
  const [gameState, setGameState] = useState({ room: null, status: "join" });
  const [username, setUsername] = useState();
  let mafiaGame;

  useEffect(() => {
    socket.on("syncGame", (state) => {
      console.log(state);
      setError("");
      setGameState(state);
    });

    socket.on("errorMsg", (errorMsg) => {
      console.log(errorMsg);
      setError(errorMsg);
    });
  }, []);

  switch (gameState.status) {
    case "lobby":
      mafiaGame = (
        <Lobby socket={socket} gameState={gameState} user={username} />
      );
      break;

    case "roleAssign":
      mafiaGame = (
        <RoleAssign socket={socket} gameState={gameState} user={username} />
      );
      break;

    case "mafiaAction":
      if (gameState.userData[username].role === "mafia") {
        mafiaGame = (
          <MafiaAction socket={socket} gameState={gameState} user={username} />
        );
      } else {
        mafiaGame = <SleepAction />;
      }
      break;
    case "mafiaKill":
      if (gameState.userData[username].role === "mafia") {
        mafiaGame = (
          <MafiaKill socket={socket} gameState={gameState} user={username} />
        );
      } else {
        mafiaGame = <SleepAction />;
      }
      break;
    case "detectiveAction":
      if (gameState.userData[username].role === "detective") {
        mafiaGame = (
          <DetectiveAction
            socket={socket}
            gameState={gameState}
            user={username}
          />
        );
      } else {
        mafiaGame = <SleepAction />;
      }
      break;
    case "detectiveInvestigation":
      if (gameState.userData[username].role === "detective") {
        mafiaGame = (
          <DetectiveInvestigation
            socket={socket}
            gameState={gameState}
            user={username}
          />
        );
      } else {
        mafiaGame = <SleepAction />;
      }
      break;

    case "doctorAction":
      if (gameState.userData[username].role === "doctor") {
        mafiaGame = (
          <DoctorAction socket={socket} gameState={gameState} user={username} />
        );
      } else {
        mafiaGame = <SleepAction />;
      }
      break;
    case "doctorSave":
      if (gameState.userData[username].role === "doctor") {
        mafiaGame = (
          <DoctorSave socket={socket} gameState={gameState} user={username} />
        );
      } else {
        mafiaGame = <SleepAction />;
      }
      break;
    case "dayPhase":
      mafiaGame = <DayPhase socket={socket} gameState={gameState} />;
      break;
    case "dayVote":
      mafiaGame = (
        <DayVoting socket={socket} gameState={gameState} user={username} />
      );
      break;
    case "winVillager":
      mafiaGame = (
        <WinVillager />
      );
      break;
    case "winMafia":
      mafiaGame = (
        <WinMafia />
      );
      break;
    default:
      mafiaGame = <PreGame socket={socket} setUsername={setUsername} />;
  }

  return (
    <div className="App">
      {mafiaGame}
      <p>{error}</p>
    </div>
  );
};

export default App;

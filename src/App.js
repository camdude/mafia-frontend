import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import PreGame from "./pages/PreGame";
import Lobby from "./pages/Lobby";
import RoleAssign from "./pages/RoleAssign";
import SleepAction from "./pages/SleepAction";
import MafiaAction from "./pages/MafiaAction";
import DetectiveAction from "./pages/DetectiveAction";
import DoctorAction from "./pages/DoctorAction";

const socket = socketIOClient("http://192.168.0.7:5000");

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

    case "doctorAction":
      if (gameState.userData[username].role === "doctor") {
        mafiaGame = (
          <DoctorAction socket={socket} gameState={gameState} user={username} />
        );
      } else {
        mafiaGame = <SleepAction />;
      }
      break;

    case "dayPhase":
      mafiaGame = <p>Day phase!</p>;
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

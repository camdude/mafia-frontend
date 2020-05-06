import React, { useState } from "react";

const DetectiveInvestigation = (props) => {
  const [finished, setfinished] = useState(false);

  const onFinish = (event) => {
    event.preventDefault();
    props.socket.emit("confirmDecision", {
      room: props.gameState.room,
      type: "detective",
      user: props.user,
    });
    setfinished(true);
  };

  return (
    <div className="ActionPage">
      <h2 className="heading-secondary u-center-text">Detectives wake up</h2>
      <p className="paragraph">{`${props.gameState.results.investigated} is ${
        props.gameState.userData[props.gameState.results.investigated].role !==
        "mafia"
          ? "not "
          : ""
      }the mafia.`}</p>
      <button onClick={onFinish} disabled={finished}>
        Continue
      </button>
    </div>
  );
};

export default DetectiveInvestigation;

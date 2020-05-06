import React, { useState } from "react";

const MafiaKill = (props) => {
  const [finished, setfinished] = useState(false);

  const onFinish = (event) => {
    event.preventDefault();
    props.socket.emit("confirmDecision", {
      room: props.gameState.room,
      type: "mafia",
      user: props.user,
    });
    setfinished(true);
  };

  return (
    <div className="ActionPage">
      <h2 className="heading-secondary u-center-text">Mafia wake up</h2>
      <p className="paragraph">{`You have chosen to kill ${props.gameState.results.killed}.`}</p>
      <button onClick={onFinish} disabled={finished}>
        Continue
      </button>
    </div>
  );
};

export default MafiaKill;

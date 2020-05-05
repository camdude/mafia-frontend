import React, { useState } from "react";

const RoleAssign = (props) => {
  const [waiting, setWaiting] = useState(false);

  const onReady = (event) => {
    event.preventDefault();
    props.socket.emit("playerReady", {
      room: props.gameState.room,
      user: props.user,
    });
    setWaiting(true);
  };

  return (
    <div className="RoleAssign">
      <h2 className="heading-secondary u-center-text">
        You are a {props.gameState.userData[props.user].role}
      </h2>
      <button onClick={onReady}>
        {waiting
          ? `Waiting on ${
            Object.keys(props.gameState.userData).length - props.gameState.ready
            } users`
          : "Ready"}
      </button>
    </div>
  );
};

export default RoleAssign;

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

  let allies = (
    <div className="allies">
      <p>The following people are also on your team</p>
      <ul>
        {Object.keys(props.gameState.userData).map((user) => {
          if (
            props.user !== user &&
            props.gameState.userData[props.user].role ===
            props.gameState.userData[user].role
          ) {
            return <li>{user}</li>;
          }
        })}
      </ul>{" "}
    </div>
  );

  return (
    <div className="ActionPage">
      <h2 className="heading-secondary u-center-text">
        You are a {props.gameState.userData[props.user].role}
      </h2>
      {props.gameState.userData[props.user].role !== "villager" ? allies : null}
      <br />
      <button onClick={onReady} disabled={waiting}>
        {waiting
          ? `Waiting on ${
              Object.keys(props.gameState.userData).length -
              props.gameState.ready
            } users`
          : "Ready"}
      </button>
    </div>
  );
};

export default RoleAssign;

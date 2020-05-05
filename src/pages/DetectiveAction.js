import React, { useState } from "react";

const DetectiveAction = (props) => {
  const [vote, setVote] = useState();

  const onDetectiveVote = (event) => {
    setVote(event.target.id);
    props.socket.emit("vote", {
      room: props.gameState.room,
      type: "detective",
      user: props.user,
      votedUser: event.target.id,
    });
  };

  return (
    <div className="DetectiveAction">
      <h2 className="heading-secondary u-center-text">Detectives wake up</h2>
      <p className="paragraph">Choose someone you would like to investigate.</p>
      <div className="">
        {Object.keys(props.gameState.userData).map((user) => {
          if (props.gameState.userData[user].role !== "detective") {
            return (
              <button
                key={user}
                id={user}
                disabled={user === vote}
                onClick={onDetectiveVote}
              >{`${user} (${
                props.gameState.userData[user].vote.length || 0
              } votes)`}</button>
            );
          }
        })}
      </div>
    </div>
  );
};

export default DetectiveAction;

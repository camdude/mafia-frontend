import React, { useState, useEffect } from "react";

const MafiaAction = (props) => {
  const [vote, setVote] = useState();

  const onMafiaVote = (event) => {
    setVote(event.target.id);
    props.socket.emit("vote", {
      room: props.gameState.room,
      type: "mafia",
      user: props.user,
      votedUser: event.target.id,
    });
  };

  return (
    <div className="MafiaAction">
      <h2 className="heading-secondary u-center-text">Mafia wake up</h2>
      <p className="paragraph">Choose someone you would like to kill.</p>
      <div className="">
        {Object.keys(props.gameState.userData).map((user) => {
          if (props.gameState.userData[user].role !== "mafia") {
            return (
              <button
                key={user}
                id={user}
                disabled={user === vote}
                onClick={onMafiaVote}
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

export default MafiaAction;

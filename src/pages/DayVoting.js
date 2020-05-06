import React, { useState } from "react";

const DayVoting = (props) => {
  const [vote, setVote] = useState();

  const onLynchVote = (event) => {
    setVote(event.target.id);
    props.socket.emit("vote", {
      room: props.gameState.room,
      type: "lynch",
      user: props.user,
      votedUser: event.target.id,
    });
  };

  return (
    <div className="ActionPage">
      <h2 className="heading-secondary u-center-text">Day Phase 🌞</h2>
      <p className="paragraph">
        Discuss what happend and then decide who you would like to lynch
      </p>
      <div className="Voting">
        {Object.keys(props.gameState.userData).map((user) => {
          return (
            <button
              key={user}
              id={user}
              // disabled={user === vote || user === props.user}
              disabled={user === vote}
              onClick={onLynchVote}
            >{`${user} [${props.gameState.userData[user].vote.map((userVote) => {
              return ` ${userVote}`;
            })} ]`}</button>
          );
        })}
      </div>
    </div>
  );
};

export default DayVoting;

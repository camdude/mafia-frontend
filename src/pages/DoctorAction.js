import React, { useState } from "react";

const DoctorAction = (props) => {
  const [vote, setVote] = useState();

  const onDoctorVote = (event) => {
    setVote(event.target.id);
    props.socket.emit("vote", {
      room: props.gameState.room,
      type: "doctor",
      user: props.user,
      votedUser: event.target.id,
    });
  };

  return (
    <div className="ActionPage">
      <h2 className="heading-secondary u-center-text">Doctors wake up</h2>
      <p className="paragraph">Choose someone you would like to save.</p>
      <div className="Voting">
        {Object.keys(props.gameState.userData).map((user) => {
          return (
            <button
              key={user}
              id={user}
              disabled={user === vote}
              onClick={onDoctorVote}
            >{`${user} (${
              props.gameState.userData[user].vote.length || 0
            } votes)`}</button>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorAction;

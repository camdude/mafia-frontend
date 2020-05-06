import React, { useState } from "react";

const DoctorSave = (props) => {
  const [finished, setfinished] = useState(false);

  const onFinish = (event) => {
    event.preventDefault();
    props.socket.emit("confirmDecision", {
      room: props.gameState.room,
      type: "doctor",
      user: props.user,
    });
    setfinished(true);
  };

  return (
    <div className="ActionPage">
      <h2 className="heading-secondary u-center-text">Doctors wake up</h2>
      <p className="paragraph">{`You have chosen to save ${props.gameState.results.saved}.`}</p>
      <button onClick={onFinish} disabled={finished}>
        Continue
      </button>
    </div>
  );
};

export default DoctorSave;

import React from "react";

const DayPhase = (props) => {
  let result;
  if (props.gameState.results.killed === props.gameState.results.saved) {
    result = "but fortunately the doctors were able to save them.";
  } else {
    result =
      "unfortunately they were succesfull and the doctors were unable to save them in time.";
  }

  return (
    <div className="ActionPage">
      <h2 className="heading-secondary u-center-text">Day Phase 🌞</h2>
      <p className="paragraph">Good Morning.</p>
      <p className="paragraph">
        It seems that during the night the mafia amoung you attempted to kill
      </p>
      <h2 className="heading-secondary u-center-text">
        {props.gameState.results.killed}
      </h2>
      <p className="paragraph">{result}</p>
    </div>
  );
};

export default DayPhase;

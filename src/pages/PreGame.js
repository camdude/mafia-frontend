import React, { useState } from "react";

const PreGame = (props) => {
  const [userInput, setUserInput] = useState("");
  const [roomInput, setRoomInput] = useState("");

  const onChangeUserInput = (event) => {
    setUserInput(event.target.value);
  };
  const onChangeRoomInput = (event) => {
    setRoomInput(event.target.value);
  };
  const onJoinGame = (event) => {
    event.preventDefault();
    props.setUsername(userInput);
    props.socket.emit("joinGame", { room: roomInput, user: userInput });
  };

  return (
    <div className="PreGame">
      <h1 className="heading-primary u-center-text">Mafia</h1>
      <form className="PreGame__form">
        <input
          className="input"
          placeholder="Username"
          value={userInput}
          onChange={onChangeUserInput}
        />
        <input
          className="input"
          placeholder="Room"
          value={roomInput}
          onChange={onChangeRoomInput}
        />
        <button type="submit" onClick={onJoinGame}>
          Join
        </button>
      </form>
    </div>
  );
};

export default PreGame;

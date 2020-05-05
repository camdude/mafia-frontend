import React, { useState } from "react";

const PreGame = (props) => {
  const [mafiaInput, setMafiaInput] = useState(0);
  const [detectiveInput, setDetectiveInput] = useState(0);
  const [doctorInput, setDoctorInput] = useState(0);

  const canAddRole = () => {
    return (
      Object.keys(props.gameState.userData).length >
      Number(mafiaInput) + Number(detectiveInput) + Number(doctorInput)
    );
  };

  const onChangeMafiaInput = (event) => {
    if (event.target.value > mafiaInput) {
      if (canAddRole()) {
        setMafiaInput(event.target.value);
      }
    } else {
      setMafiaInput(event.target.value);
    }
  };
  const onChangeDetectiveInput = (event) => {
    if (event.target.value > detectiveInput) {
      if (canAddRole()) {
        setDetectiveInput(event.target.value);
      }
    } else {
      setDetectiveInput(event.target.value);
    }
  };
  const onChangeDoctorInput = (event) => {
    if (event.target.value > doctorInput) {
      if (canAddRole()) {
        setDoctorInput(event.target.value);
      }
    } else {
      setDoctorInput(event.target.value);
    }
  };

  const onStartGame = (event) => {
    event.preventDefault();
    props.socket.emit("startGame", {
      room: props.gameState.room,
      user: props.user,
      roles: {
        mafia: Number(mafiaInput),
        detective: Number(detectiveInput),
        doctor: Number(doctorInput),
        villager:
          Object.keys(props.gameState.userData).length -
          (Number(mafiaInput) + Number(detectiveInput) + Number(doctorInput)),
      },
    });
  };

  const adminControls = (
    <form className="Lobby__admin">
      <h3 className="heading-tertiary">Roles</h3>
      <div className="inputGroup">
        <label htmlFor="mafia" className="inputGroup__label">
          Mafia
        </label>
        <input
          className="input input__number"
          id="mafia"
          type="number"
          value={mafiaInput}
          onChange={onChangeMafiaInput}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="detectives" className="inputGroup__label">
          Detectives
        </label>
        <input
          className="input input__number"
          id="detectives"
          type="number"
          value={detectiveInput}
          onChange={onChangeDetectiveInput}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="doctors" className="inputGroup__label">
          Doctors
        </label>
        <input
          className="input input__number"
          id="doctors"
          type="number"
          value={doctorInput}
          onChange={onChangeDoctorInput}
        />
      </div>
      <div className="inputGroup">
        <label htmlFor="doctors" className="inputGroup__label">
          Villagers
        </label>
        <input
          className="input input__number"
          id="doctors"
          type="number"
          disabled
          value={
            Object.keys(props.gameState.userData).length -
            (Number(mafiaInput) + Number(detectiveInput) + Number(doctorInput))
          }
        />
      </div>
      <button onClick={onStartGame}>Start</button>
    </form>
  );

  return (
    <div className="Lobby">
      <h2 className="heading-secondary u-center-text">
        {props.gameState.room}
      </h2>
      <h3 className="heading-tertiary">Players</h3>
      <ul className="Lobby__users">
        {Object.keys(props.gameState.userData).map((user, i) => {
          return <li key={i}>{user}</li>;
        })}
      </ul>
      {props.user === props.gameState.admin ? (
        adminControls
      ) : (
        <p className="paragraph">
          Waiting for {props.gameState.admin} to start the game.
        </p>
      )}
    </div>
  );
};

export default PreGame;

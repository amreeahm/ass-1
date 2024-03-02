import React from "react";
import "./Resident.css";

function Resident({ resident }) {
  return (
    <li className="resident">
      <p>Name: {resident.name}</p>
      <p>Height: {resident.height} cms</p>
      <p>Mass: {resident.mass} kg</p>
      <p>Gender: {resident.gender}</p>
    </li>
  );
}

export default Resident;

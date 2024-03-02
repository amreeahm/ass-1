import React, { useState, useEffect } from "react";
import Resident from "./Resident";
import "./PlanetCard.css";

function PlanetCard({ planet }) {
  const [residents, setResidents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResidentsData = async () => {
      try {
        const residentData = await Promise.all(
          planet.residents.map(async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error("Failed to fetch data of the residents.");
            }
            return await response.json();
          })
        );
        setResidents(residentData);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchResidentsData();
  }, [planet.residents]);

  let population;

  if (planet.population > 0 && planet.population < 1000000000) {
    population = (planet.population / 1000000).toLocaleString() + " Million";
  } else {
    population = 0;
  }

  if (planet.population >= 1000000000 && planet.population < 1000000000000) {
    population = (planet.population / 1000000000).toLocaleString() + " Billion";
  }

  if (planet.population >= 1000000000000) {
    population =
      (planet.population / 1000000000000).toLocaleString() + " Trillion";
  }

  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>
      <p>CLIMATE: {planet.climate}</p>
      <p>POPULATION: {population} </p>
      <p>TERRAIN: {planet.terrain}</p>
      <span className="underline-animation">RESIDENTS</span>
      <div className="mini-planet-card">
        {error && <p className="error">{error}</p>}
        <ul>
          {residents.length > 0 ? (
            residents.map((resident) => (
              <Resident key={resident.name} resident={resident} />
            ))
          ) : (
            <li>No residents</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default PlanetCard;

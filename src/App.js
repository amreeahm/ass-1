import React, { useState, useEffect } from "react";
import PlanetCard from "./PlanetCard";
import Pagination from "./Pagination";
import "./App.css";

function App() {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [prevPage, setPrevPage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlanetInfo("https://swapi.dev/api/planets/?format=json");
  }, []);

  const fetchPlanetInfo = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      setPlanets(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchPlanetInfo(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchPlanetInfo(prevPage);
    }
  };

  return (
    <div className="app">
      <h1 className="underline-animation-2">Star Wars Planets Directory</h1>
      {error && <p className="error">{error}</p>}
      <div className="planets-container">
        {planets.map((planet) => (
          <PlanetCard key={planet.name} planet={planet} />
        ))}
      </div>
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
}

export default App;

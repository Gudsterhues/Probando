import { useState, type FormEvent } from "react";
import Graph from "./Graph";
import "./index.css";

function App() {
  const [graph, setGraph] = useState<Graph>(new Graph());

  const [cityName, setCityName] = useState<string>("");

  const [personName, setPersonName] = useState<string>("");
  const [personAge, setPersonAge] = useState<string>("");
  const [personCityId, setPersonCityId] = useState<string>("");

  const [selectedCityId, setSelectedCityId] = useState<string>("");

  const cities = graph.getCities();
  const peopleByCity = graph.getPeopleByCity(selectedCityId);
  const graphData = graph.toGraphView();

  function handleAddCity(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (cityName.trim() === "") {
      alert("Escribe el nombre de la ciudad");
      return;
    }

    const newGraph = graph.clone();
    newGraph.addCity(cityName);

    setGraph(newGraph);
    setCityName("");
  }

  function handleAddPerson(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (
      personName.trim() === "" ||
      personAge.trim() === "" ||
      personCityId === ""
    ) {
      alert("Completa todos los datos de la persona");
      return;
    }

    const newGraph = graph.clone();
    newGraph.addPerson(personName, personAge, personCityId);

    setGraph(newGraph);
    setPersonName("");
    setPersonAge("");
    setPersonCityId("");
  }

  return (
    <main className="contenedor">
      <h1>Challenge 10 - Grafos</h1>

      <section className="tarjeta">
        <h2>Agregar ciudad</h2>

        <form onSubmit={handleAddCity} className="formulario">
          <input
            type="text"
            placeholder="Nombre de la ciudad"
            value={cityName}
            onChange={(event) => setCityName(event.target.value)}
          />

          <button type="submit">Agregar ciudad</button>
        </form>
      </section>

      <section className="tarjeta">
        <h2>Agregar persona</h2>

        <form onSubmit={handleAddPerson} className="formulario">
          <input
            type="text"
            placeholder="Nombre de la persona"
            value={personName}
            onChange={(event) => setPersonName(event.target.value)}
          />

          <input
            type="number"
            placeholder="Edad"
            value={personAge}
            onChange={(event) => setPersonAge(event.target.value)}
          />

          <select
            value={personCityId}
            onChange={(event) => setPersonCityId(event.target.value)}
          >
            <option value="">Selecciona una ciudad</option>

            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>

          <button type="submit">Agregar persona</button>
        </form>
      </section>

      <section className="tarjeta">
        <h2>Buscar personas por ciudad</h2>

        <select
          value={selectedCityId}
          onChange={(event) => setSelectedCityId(event.target.value)}
        >
          <option value="">Selecciona una ciudad</option>

          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>

        <div className="resultado">
          {selectedCityId === "" ? (
            <p>Selecciona una ciudad para ver las personas.</p>
          ) : peopleByCity.length === 0 ? (
            <p>No hay personas registradas en esta ciudad.</p>
          ) : (
            <ul>
              {peopleByCity.map((person) => (
                <li key={person.id}>
                  {person.name} - {person.age} años
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="tarjeta">
        <h2>Grafo en pantalla</h2>

        {graphData.nodes.length === 0 ? (
          <p>No hay nodos todavía.</p>
        ) : (
          <div className="grafo-simple">
            <svg width="100%" height="400">
              {graphData.links.map((link, index) => {
                const sourceIndex = graphData.nodes.findIndex(
                  (node) => node.id === link.source
                );

                const targetIndex = graphData.nodes.findIndex(
                  (node) => node.id === link.target
                );

                const sourceX = 150 + sourceIndex * 120;
                const sourceY = sourceIndex % 2 === 0 ? 100 : 250;

                const targetX = 150 + targetIndex * 120;
                const targetY = targetIndex % 2 === 0 ? 100 : 250;

                return (
                  <line
                    key={index}
                    x1={sourceX}
                    y1={sourceY}
                    x2={targetX}
                    y2={targetY}
                    stroke="#777"
                    strokeWidth="2"
                  />
                );
              })}

              {graphData.nodes.map((node, index) => {
                const x = 150 + index * 120;
                const y = index % 2 === 0 ? 100 : 250;

                return (
                  <g key={node.id}>
                    <circle
                      cx={x}
                      cy={y}
                      r="35"
                      fill={node.color}
                      stroke="#222"
                      strokeWidth="2"
                    />

                    <text
                      x={x}
                      y={y + 55}
                      textAnchor="middle"
                      fontSize="13"
                      fill="#222"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        )}
      </section>

      <section className="tarjeta">
        <h2>Lista de adyacencia</h2>

        <pre>{JSON.stringify(graph.printGraph(), null, 2)}</pre>
      </section>
    </main>
  );
}

export default App;
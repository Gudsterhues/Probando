import { useState } from "react";

interface PanelCrearCancionProps {
  cancionesDisponibles: string[];
  crearCancion: (
    titulo: string,
    artista: string,
    popularidad: number,
    cancionRelacionada: string
  ) => void;
}

export function PanelCrearCancion({
  cancionesDisponibles,
  crearCancion,
}: PanelCrearCancionProps) {
  const [titulo, setTitulo] = useState<string>("");
  const [artista, setArtista] = useState<string>("");
  const [popularidad, setPopularidad] = useState<string>("");
  const [cancionRelacionada, setCancionRelacionada] = useState<string>("");

  const manejarCrearCancion = (): void => {
    if (
      titulo.trim() === "" ||
      artista.trim() === "" ||
      popularidad.trim() === ""
    ) {
      return;
    }

    crearCancion(titulo, artista, Number(popularidad), cancionRelacionada);

    setTitulo("");
    setArtista("");
    setPopularidad("");
    setCancionRelacionada("");
  };

  return (
    <section className="panel panel-crear-cancion">
      <h2>Crear canción</h2>
      <p>Inserta nuevas canciones en el Trie, Max Heap y Grafo.</p>

      <div className="formulario-cancion">
        <input
          type="text"
          placeholder="Título de la canción"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
        />

        <input
          type="text"
          placeholder="Artista"
          value={artista}
          onChange={(event) => setArtista(event.target.value)}
        />

        <input
          type="number"
          placeholder="Popularidad"
          value={popularidad}
          onChange={(event) => setPopularidad(event.target.value)}
        />

        <select
          value={cancionRelacionada}
          onChange={(event) => setCancionRelacionada(event.target.value)}
        >
          <option value="">Sin canción relacionada</option>

          {cancionesDisponibles.map((tituloCancion: string) => (
            <option key={tituloCancion} value={tituloCancion}>
              {tituloCancion}
            </option>
          ))}
        </select>

        <button type="button" onClick={manejarCrearCancion}>
          Agregar canción
        </button>
      </div>
    </section>
  );
}
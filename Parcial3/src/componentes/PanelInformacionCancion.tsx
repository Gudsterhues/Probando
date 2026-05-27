import type { Cancion } from "../interfaces/cancion.interface";

interface PanelInformacionCancionProps {
  cancionSeleccionada: Cancion | null;
}

export function PanelInformacionCancion({
  cancionSeleccionada,
}: PanelInformacionCancionProps) {
  return (
    <section className="panel panel-informacion-cancion">
      <h2>Información de la canción</h2>
      <p>Detalle de la canción seleccionada en el buscador.</p>

      {!cancionSeleccionada && (
        <p className="texto-vacio">
          Busca o selecciona una canción para ver su información.
        </p>
      )}

      {cancionSeleccionada && (
        <div className="detalle-cancion">
          <h3>{cancionSeleccionada.titulo}</h3>

          <div className="detalle-fila">
            <span>Artista:</span>
            <strong>{cancionSeleccionada.artista}</strong>
          </div>

          <div className="detalle-fila">
            <span>Popularidad:</span>
            <strong>{cancionSeleccionada.popularidad}</strong>
          </div>

          <div className="barra-popularidad">
            <div
              className="progreso-popularidad"
              style={{ width: `${cancionSeleccionada.popularidad}%` }}
            ></div>
          </div>
        </div>
      )}
    </section>
  );
}
import type { Cancion } from "../interfaces/cancion.interface";
import { TarjetaCancion } from "./TarjetaCancion";

interface PanelRecomendacionesProps {
  cancionSeleccionada: Cancion | null;
  cancionesRelacionadas: Cancion[];
  seleccionarCancion: (titulo: string) => void;
}

export function PanelRecomendaciones({
  cancionSeleccionada,
  cancionesRelacionadas,
  seleccionarCancion,
}: PanelRecomendacionesProps) {
  return (
    <section className="panel panel-recomendaciones">
      <h2>Recomendaciones</h2>
      <p>Relaciones entre canciones usando un grafo no dirigido.</p>

      {!cancionSeleccionada && (
        <p className="texto-vacio">
          Selecciona una canción para ver recomendaciones.
        </p>
      )}

      {cancionSeleccionada && (
        <>
          <div className="cancion-seleccionada">
            <span>Canción seleccionada:</span>
            <strong>{cancionSeleccionada.titulo}</strong>
          </div>

          {cancionesRelacionadas.length === 0 && (
            <p className="texto-vacio">No hay canciones relacionadas.</p>
          )}

          <div className="lista-canciones">
            {cancionesRelacionadas.map((cancion: Cancion) => (
              <TarjetaCancion
                key={cancion.id}
                cancion={cancion}
                seleccionarCancion={seleccionarCancion}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
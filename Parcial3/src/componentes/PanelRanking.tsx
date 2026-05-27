import type { Cancion } from "../interfaces/cancion.interface";
import { TarjetaCancion } from "./TarjetaCancion";

interface PanelRankingProps {
  cancionesTop: Cancion[];
  seleccionarCancion: (titulo: string) => void;
}

export function PanelRanking({
  cancionesTop,
  seleccionarCancion,
}: PanelRankingProps) {
  return (
    <section className="panel panel-ranking">
      <h2>TOP canciones populares</h2>
      <p>Ranking organizado con Max Heap.</p>

      <div className="lista-canciones">
        {cancionesTop.map((cancion: Cancion) => (
          <TarjetaCancion
            key={cancion.id}
            cancion={cancion}
            seleccionarCancion={seleccionarCancion}
          />
        ))}
      </div>
    </section>
  );
}
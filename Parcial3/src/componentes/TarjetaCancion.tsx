import type { Cancion } from "../interfaces/cancion.interface";

interface TarjetaCancionProps {
  cancion: Cancion;
  seleccionarCancion?: (titulo: string) => void;
}

export function TarjetaCancion({
  cancion,
  seleccionarCancion,
}: TarjetaCancionProps) {
  const manejarClick = (): void => {
    if (seleccionarCancion) {
      seleccionarCancion(cancion.titulo);
    }
  };

  return (
    <article className="tarjeta-cancion" onClick={manejarClick}>
      <div>
        <h3>{cancion.titulo}</h3>
        <p>{cancion.artista}</p>
      </div>

      <span>{cancion.popularidad}</span>
    </article>
  );
}
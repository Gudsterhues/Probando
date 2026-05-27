interface PanelBuscadorProps {
  textoBusqueda: string;
  sugerencias: string[];
  existeCancion: boolean;
  cambiarBusqueda: (valor: string) => void;
  seleccionarCancion: (titulo: string) => void;
}

export function PanelBuscador({
  textoBusqueda,
  sugerencias,
  existeCancion,
  cambiarBusqueda,
  seleccionarCancion,
}: PanelBuscadorProps) {
  return (
    <section className="panel panel-buscador">
      <h2>Buscador predictivo</h2>
      <p>Busca canciones usando la estructura Trie.</p>

      <input
        type="text"
        placeholder="Escribe el nombre de una canción..."
        value={textoBusqueda}
        onChange={(event) => cambiarBusqueda(event.target.value)}
      />

      {textoBusqueda.length > 0 && existeCancion && (
        <p className="texto-existe">La canción existe en el sistema.</p>
      )}

      {textoBusqueda.length > 0 && !existeCancion && (
        <p className="texto-vacio">La canción no existe exactamente.</p>
      )}

      <div className="sugerencias">
        {sugerencias.length === 0 && textoBusqueda.length > 0 && (
          <p className="texto-vacio">No se encontraron sugerencias.</p>
        )}

        {sugerencias.map((sugerencia: string) => (
          <button
            key={sugerencia}
            className="boton-sugerencia"
            onClick={() => seleccionarCancion(sugerencia)}
          >
            {sugerencia}
          </button>
        ))}
      </div>
    </section>
  );
}
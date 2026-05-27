import { useState } from "react";
import { Trie } from "../algoritmos/Trie";
import { MaxHeap } from "../algoritmos/MaxHeap";
import { Grafo } from "../algoritmos/Grafo";
import { canciones } from "../data/cancion";
import type { Cancion } from "../interfaces/cancion.interface";
import { Encabezado } from "../componentes/Encabezado";
import { PanelBuscador } from "../componentes/PanelBuscador";
import { PanelRanking } from "../componentes/PanelRanking";
import { PanelRecomendaciones } from "../componentes/PanelRecomendaciones";
import { PanelCrearCancion } from "../componentes/PanelCrearCancion";
import { PanelInformacionCancion } from "../componentes/PanelInformacionCancion";

interface ConexionCancion {
  origen: string;
  destino: string;
}

const conexionesIniciales: ConexionCancion[] = [
  {
    origen: "Old Town Road",
    destino: "Industry Baby",
  },
  {
    origen: "Old Town Road",
    destino: "Panini",
  },
  {
    origen: "Industry Baby",
    destino: "Star Walkin",
  },
  {
    origen: "Panini",
    destino: "Star Walkin",
  },
  {
    origen: "Sunflower",
    destino: "Circles",
  },
  {
    origen: "Sunflower",
    destino: "Better Now",
  },
  {
    origen: "Circles",
    destino: "Chemical",
  },
  {
    origen: "Rockstar",
    destino: "Congratulations",
  },
  {
    origen: "Rockstar",
    destino: "Better Now",
  },
  {
    origen: "Congratulations",
    destino: "Chemical",
  },
  {
    origen: "Luna Roja",
    destino: "Orbita Perdida",
  },
  {
    origen: "Luna Roja",
    destino: "Galaxia Azul",
  },
  {
    origen: "Orbita Perdida",
    destino: "Viaje Espacial",
  },
  {
    origen: "Viaje Espacial",
    destino: "Planeta Lejano",
  },
  {
    origen: "Galaxia Azul",
    destino: "Satelite",
  },
  {
    origen: "Planeta Lejano",
    destino: "Satelite",
  },
  {
    origen: "El Triste",
    destino: "Almohada",
  },
  {
    origen: "El Triste",
    destino: "La Nave del Olvido",
  },
  {
    origen: "Almohada",
    destino: "Lo Dudo",
  },
  {
    origen: "Gavilan o Paloma",
    destino: "Volcan",
  },
  {
    origen: "Gavilan o Paloma",
    destino: "Lo Pasado Pasado",
  },
  {
    origen: "La Nave del Olvido",
    destino: "Amar y Querer",
  },
  {
    origen: "Lo Pasado Pasado",
    destino: "Amar y Querer",
  },
  {
    origen: "Volcan",
    destino: "Lo Dudo",
  },
  {
    origen: "Bad Habits",
    destino: "Dark Red",
  },
  {
    origen: "Bad Habits",
    destino: "Sweater Weather",
  },
  {
    origen: "Sweater Weather",
    destino: "Daddy Issues",
  },
  {
    origen: "Daddy Issues",
    destino: "Dark Red",
  },
  {
    origen: "Star Walkin",
    destino: "Viaje Espacial",
  },
  {
    origen: "Sunflower",
    destino: "Bad Habits",
  },
  {
    origen: "El Triste",
    destino: "Sunflower",
  },
  {
    origen: "Almohada",
    destino: "Circles",
  },
];

export function Inicio() {
  const [listaCanciones, setListaCanciones] = useState<Cancion[]>(canciones);
  const [conexiones, setConexiones] =
    useState<ConexionCancion[]>(conexionesIniciales);

  const [textoBusqueda, setTextoBusqueda] = useState<string>("");
  const [sugerencias, setSugerencias] = useState<string[]>([]);
  const [existeCancion, setExisteCancion] = useState<boolean>(false);

  const [cancionSeleccionada, setCancionSeleccionada] =
    useState<Cancion | null>(null);

  const [cancionesRelacionadas, setCancionesRelacionadas] = useState<Cancion[]>(
    []
  );

  const trie: Trie = new Trie();
  const heap: MaxHeap = new MaxHeap(listaCanciones);
  const grafo: Grafo = new Grafo();

  listaCanciones.forEach((cancion: Cancion) => {
    trie.insert(cancion.titulo);
    grafo.agregarNodo(cancion.titulo);
  });

  conexiones.forEach((conexion: ConexionCancion) => {
    grafo.agregarArista(conexion.origen, conexion.destino);
  });

  const cancionesTop: Cancion[] = heap.obtenerTop(5);

  const titulosCanciones: string[] = listaCanciones.map(
    (cancion: Cancion) => cancion.titulo
  );

  const manejarCambioBusqueda = (valor: string): void => {
    setTextoBusqueda(valor);

    if (valor.trim() === "") {
        setSugerencias([]);
        setExisteCancion(false);
        setCancionSeleccionada(null);
        setCancionesRelacionadas([]);
        return;
    }

    const nuevasSugerencias: string[] = trie.obtenerSugerencias(valor);
    const existe: boolean = trie.search(valor);

    setSugerencias(nuevasSugerencias);
    setExisteCancion(existe);

    if (existe) {
        const cancionEncontrada: Cancion | undefined = listaCanciones.find(
        (cancion: Cancion) => cancion.titulo === valor
        );

        if (cancionEncontrada) {
        setCancionSeleccionada(cancionEncontrada);

        const titulosRelacionados: string[] =
            grafo.obtenerCancionesRelacionadas(valor);

        const nuevasCancionesRelacionadas: Cancion[] = listaCanciones.filter(
            (cancion: Cancion) => titulosRelacionados.includes(cancion.titulo)
        );

        setCancionesRelacionadas(nuevasCancionesRelacionadas);
        }
    } else {
        setCancionSeleccionada(null);
        setCancionesRelacionadas([]);
    }
    };

  const manejarSeleccionCancion = (titulo: string): void => {
    const cancionEncontrada: Cancion | undefined = listaCanciones.find(
      (cancion: Cancion) => cancion.titulo === titulo
    );

    if (!cancionEncontrada) {
      return;
    }

    setTextoBusqueda(titulo);
    setSugerencias([]);
    setExisteCancion(true);
    setCancionSeleccionada(cancionEncontrada);

    const titulosRelacionados: string[] =
      grafo.obtenerCancionesRelacionadas(titulo);

    const nuevasCancionesRelacionadas: Cancion[] = listaCanciones.filter(
      (cancion: Cancion) => titulosRelacionados.includes(cancion.titulo)
    );

    setCancionesRelacionadas(nuevasCancionesRelacionadas);
  };

  const crearCancion = (
    titulo: string,
    artista: string,
    popularidad: number,
    cancionRelacionada: string
  ): void => {
    const tituloLimpio: string = titulo.trim();
    const artistaLimpio: string = artista.trim();

    if (tituloLimpio === "" || artistaLimpio === "") {
      return;
    }

    if (popularidad <= 0) {
      return;
    }

    const yaExiste: boolean = trie.search(tituloLimpio);

    if (yaExiste) {
      return;
    }

    const nuevaCancion: Cancion = {
      id: listaCanciones.length + 1,
      titulo: tituloLimpio,
      artista: artistaLimpio,
      popularidad: popularidad,
    };

    setListaCanciones([...listaCanciones, nuevaCancion]);

    if (cancionRelacionada !== "") {
      const nuevaConexion: ConexionCancion = {
        origen: tituloLimpio,
        destino: cancionRelacionada,
      };

      setConexiones([...conexiones, nuevaConexion]);
    }

    setTextoBusqueda("");
    setSugerencias([]);
    setExisteCancion(false);
  };

  return (
    <div className="inicio">
      <Encabezado />

      <main className="contenido-inicio">
        <PanelBuscador
        textoBusqueda={textoBusqueda}
        sugerencias={sugerencias}
        existeCancion={existeCancion}
        cambiarBusqueda={manejarCambioBusqueda}
        seleccionarCancion={manejarSeleccionCancion}
        />

        <PanelInformacionCancion cancionSeleccionada={cancionSeleccionada} />

        <PanelCrearCancion
        cancionesDisponibles={titulosCanciones}
        crearCancion={crearCancion}
        />

        <PanelRanking
        cancionesTop={cancionesTop}
        seleccionarCancion={manejarSeleccionCancion}
        />

        <PanelRecomendaciones
        cancionSeleccionada={cancionSeleccionada}
        cancionesRelacionadas={cancionesRelacionadas}
        seleccionarCancion={manejarSeleccionCancion}
        />
      </main>
    </div>
  );
}
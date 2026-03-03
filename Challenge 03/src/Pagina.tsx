// src/Pagina.tsx
import { useState } from "react";
import DoubleList from "./DoubleList";
import type { PaginaNode, Pagina } from "./nodePagina";

const paginasprueba: Pagina[] = [
  { id: 1, url: "/" },
  { id: 2, url: "/profile" },
  { id: 3, url: "/settings" },
  { id: 4, url: "/help" },
];

const lista = new DoubleList(paginasprueba);

function Web() {
  const [nodoactual, setnodoactual] = useState<PaginaNode | null>(lista.tail);

  const siguiente = () => {
    if (nodoactual && nodoactual.next) {
      setnodoactual(nodoactual.next);
    }
  };

  const atras = () => {
    if (nodoactual && nodoactual.back) {
      setnodoactual(nodoactual.back);
    }
  };

  const reinicio = () => {
    setnodoactual(lista.tail); 
  };

  if (!nodoactual) {
    return <p>No hay paginas web</p>;
  }

  return (
    <>
      <h2>Navegador de paginas web</h2>

      <p>Te encuentras: {nodoactual.value.url}</p>

      <button onClick={atras} disabled={nodoactual.back === null}>
        Previa
      </button>

      <button onClick={siguiente} disabled={nodoactual.next === null}>
        Siguiente
      </button>

      <button onClick={reinicio}>Reiniciar</button>
    </>
  );
}

export default Web;
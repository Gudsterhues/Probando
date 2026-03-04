import { useState } from "react";
import DoubleCircularMiembros from "./DoubleCircularlist";
import type { NodeMiembro, Miembro } from "./nodeComite";

const DatosComite: Miembro[] = [
  { id: 1, Miembro: "Valeria" },
  { id: 2, Miembro: "Ximena" },
  { id: 3, Miembro: "Cristian" },
  { id: 4, Miembro: "Roberto" },
];

const comite = new DoubleCircularMiembros();
for (let i = 0; i < DatosComite.length; i++) {
  comite.append(DatosComite[i]);
}

function Comite() {
  const [currentNode, setCurrentNode] = useState<NodeMiembro | null>(comite.head);

  function Siguiente() {
    if (currentNode && currentNode.next) {
      setCurrentNode(currentNode.next);
    }
  }

  function Atras() {
    if (currentNode && currentNode.back) {
      setCurrentNode(currentNode.back);
    }
  }
  let listaTexto: string[] = [];
  if (comite.head) {
    let temp = comite.head;
    for (let i = 0; i < comite.length; i++) {
      listaTexto.push(temp.value.Miembro);
      temp = temp.next!;
    }
  }

  let actual = "No hay miembros";
  if (currentNode) actual = currentNode.value.Miembro;

  return (
    <div>
      <h2>Miembros del comite</h2>

      <p>Miembro actual: {actual}</p>

      <button onClick={Atras}>Atrás</button>
      <button onClick={Siguiente}>Siguiente</button>
    </div>
  );
}

export default Comite;
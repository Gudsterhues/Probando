import { useEffect, useState } from "react";
import LinkedList from "./Linkedlist";
import type { NodePaciente, Paciente } from "./nodePacientes";
import DoublelistHistorial from "./Doublelist";
import type { NodeHistorial } from "./nodeHistorial";
import CircularSimpleList from "./Circularsimplelist";
import type { NodeRotacionMedicos, RotacionMedicos } from "./nodeRotacionMedicos";

const DatosPrueba: Paciente[] = [
  { id: 1, nombre: "Samuel Garcia", edad: 19 },
  { id: 2, nombre: "Ramiro Ramirez", edad: 20 },
  { id: 3, nombre: "Carlos Rodriguez", edad: 21 },
];

const list = new LinkedList();
for (let i = 0; i < DatosPrueba.length; i++) {
  list.append(DatosPrueba[i]);
}

const historial = new DoublelistHistorial();


const DoctoresPrueba: RotacionMedicos[] = [
  { id: 1, DoctorEnTurno: "Dra. Patricia" },
  { id: 2, DoctorEnTurno: "Dr. Guillermo" },
  { id: 3, DoctorEnTurno: "Dra. Laura" },
];

const listaDoctores = new CircularSimpleList();
for (let i = 0; i < DoctoresPrueba.length; i++) {
  listaDoctores.append(DoctoresPrueba[i]);
}

function ListadoPacientes() {
  const [currentNode, setCurrentNode] = useState<NodePaciente | null>(list.head);
  const [histNode, setHistNode] = useState<NodeHistorial | null>(historial.tail);


  const [doctorActual, setDoctorActual] = useState<NodeRotacionMedicos | null>(listaDoctores.head);

  useEffect(() => {
    const timer = setInterval(() => {
      setDoctorActual((prev) => {
        if (prev && prev.next) return prev.next;
        return listaDoctores.head;
      });
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  function Siguiente() {
    if (currentNode && currentNode.next) setCurrentNode(currentNode.next);
  }

  function Reiniciar() {
    setCurrentNode(list.head);
  }

  function Atender() {
    if (!currentNode) return;

    const nombrePaciente = currentNode.value.nombre;

    let nombreDoctor = "Sin doctor";
    if (doctorActual) nombreDoctor = doctorActual.value.DoctorEnTurno;

    const next = currentNode.next;

    list.remove(currentNode.value);

    historial.append({
      id: Date.now(),
      Paciente_atendido: nombrePaciente,
      Doctor_atendio: nombreDoctor,
    });

    setHistNode(historial.tail);
    setCurrentNode(next ? next : list.head);
  }

  function HistAtras() {
    if (histNode && histNode.back) setHistNode(histNode.back);
  }

  function HistSiguiente() {
    if (histNode && histNode.next) setHistNode(histNode.next);
  }

  let textoPaciente = "No hay pacientes";
  if (currentNode) textoPaciente = currentNode.value.nombre + " con " + currentNode.value.edad + " años de edad";

  let textoDoctor = "Sin doctor";
  if (doctorActual) textoDoctor = doctorActual.value.DoctorEnTurno;

  let textoHistorial = "No hay historial";
  if (histNode) {
    textoHistorial ="Paciente atendido: " + histNode.value.Paciente_atendido +","  + " por: " + histNode.value.Doctor_atendio;
  }

  return (
    <div>

      <h1>Clinica UAO</h1>
      <h2>Doctor en turno</h2>
      <p>{textoDoctor}</p>

      <h2>Paciente actual</h2>
      <p>{textoPaciente}</p>

      <button onClick={Siguiente}>Siguiente</button>
      <button onClick={Reiniciar}>Reiniciar</button>
      <button onClick={Atender}>Atender</button>

      <h2>Historial</h2>
      <p>{textoHistorial}</p>

      <button onClick={HistAtras}>Atrás</button>
      <button onClick={HistSiguiente}>Siguiente</button>
    </div>
  );
}

export default ListadoPacientes;
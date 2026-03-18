import { useState } from "react";

export interface cajero {
  nombre: string;
  date: string;
  dinero: number;
}

export class CajeroQueu {
  items: cajero[];
  value: cajero;

  constructor() {
    this.items = [];
    this.value = { nombre: "", date: "", dinero: 0 };
  }

  enqueue(value: cajero) {
    this.items.push(value);
    this.value = value;
  }

  dequeue() {
    return this.items.length > 0 ? this.items.shift() : null;
  }

  peek() {
    return this.items.length > 0 ? this.items[0] : null;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    return this.items
      .slice()
      .sort(
        (a, b) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
  }
}

function Cajeros() {
  function generarFechaRandom() {
    const inicio = new Date(2026, 0, 1).getTime();
    const fin = new Date().getTime();
    const fechaRandom = new Date(
      inicio + Math.random() * (fin - inicio)
    );
    return fechaRandom.toISOString();
  }

  const [cajerosqueue, setCajeros] = useState<CajeroQueu>(() => {
    const queue = new CajeroQueu();

    queue.enqueue({
      nombre: "Ana",
      date: generarFechaRandom(),
      dinero: 1000,
    });

    queue.enqueue({
      nombre: "Luis",
      date: generarFechaRandom(),
      dinero: 1500,
    });

    queue.enqueue({
      nombre: "Carlos",
      date: generarFechaRandom(),
      dinero: 2000,
    });

    return queue;
  });

  const [nombre, setNombre] = useState("");
  const [dinero, setDinero] = useState(0);

  function agregarCajero() {
    if (nombre.trim() === "" || dinero <= 0) {
      alert("Ingrese un nombre y un monto válido");
      return;
    }

    const nuevoCajero: cajero = {
      nombre,
      date: generarFechaRandom(),
      dinero,
    };

    const nuevaQueu = new CajeroQueu();

    cajerosqueue.items.forEach((cajero) => {
      nuevaQueu.enqueue(cajero);
    });

    nuevaQueu.enqueue(nuevoCajero);
    setCajeros(nuevaQueu);

    setNombre("");
    setDinero(0);
  }

  return (
    <>
      <h2>Cajero UAO</h2>

      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="number"
        value={dinero}
        onChange={(e) => setDinero(Number(e.target.value))}
      />

      <button onClick={agregarCajero}>Añadir</button>

      <h3>Lista de Retiros</h3>

      {cajerosqueue.print().map((cajero, index) => (
        <div key={index}>
          <p>Nombre: {cajero.nombre}</p>
          <p>Monto: ${cajero.dinero}</p>
          <p>
            Fecha de llegada:{" "}
            {new Date(cajero.date).toLocaleString("es-CO")}
          </p>
          <hr />
        </div>
      ))}
    </>
  );
}

export default Cajeros;
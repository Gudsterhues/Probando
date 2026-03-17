import { useState } from "react";

export interface Book {
  nombre: string;
  isbn: number;
  autor: string;
  editorial: string;
}

export class Bookstack {
  items: Book[];
  value: Book;

  constructor() {
    this.items = [];
    this.value = { nombre: "", isbn: 0, autor: "", editorial: "" };
  }

  push(value: Book) {
    this.items.push(value);
    this.value = value;
  }

  pop() {
    return this.items.length > 0 ? this.items.pop() : null;
  }

  peek() {
    return this.items.length > 0
      ? this.items[this.items.length - 1] ?? null
      : null;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    return this.items.slice().reverse();
  }
}
function Libros() {
  const [bookstack, setBookstack] = useState<Bookstack>(() => {
    const stack = new Bookstack();

    stack.push({
      nombre: "el tunel",
      isbn: 1,
      autor: "Ernesto Sabato",
      editorial: "Penguin Random House",
    });

    stack.push({
      nombre: "Cien años de soledad",
      isbn: 2,
      autor: "Gabo",
      editorial: "Realismo Magico",
    });

    stack.push({
      nombre: "Amor en los tiempos del colera",
      isbn: 3,
      autor: "Gabo",
      editorial: "Realismo Magico",
    });

    return stack;
  });

  const [nombre, setNombre] = useState("");
  const [isbn, setIsbn] = useState("");
  const [autor, setAutor] = useState("");
  const [editorial, setEditorial] = useState("");

  function agregarLibro() {
    const nuevoLibro: Book = {
      nombre: nombre,
      isbn: Number(isbn),
      autor: autor,
      editorial: editorial,
    };

    const nuevaPila = new Bookstack();

    bookstack.items.forEach((libro) => {
      nuevaPila.push(libro);
    });

    nuevaPila.push(nuevoLibro);

    setBookstack(nuevaPila);

    setNombre("");
    setIsbn("");
    setAutor("");
    setEditorial("");
  }

  return (
    <>
      <h2>Biblioteca</h2>

      <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input
        type="number"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <input value={autor} onChange={(e) => setAutor(e.target.value)} />
      <input
        value={editorial}
        onChange={(e) => setEditorial(e.target.value)}
      />

      <button onClick={agregarLibro}>Añadir</button>

      <h3>Lista de libros</h3>

      {bookstack.print().map((book, index) => (
        <div key={index}>
          <p>Nombre: {book.nombre}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Autor: {book.autor}</p>
          <p>Editorial: {book.editorial}</p>
        </div>
      ))}
    </>
  );
}

export default Libros;
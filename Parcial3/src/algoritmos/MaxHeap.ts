import type { Cancion } from "../interfaces/cancion.interface";

export class MaxHeap {
  private heap: Cancion[];

  constructor(canciones: Cancion[] = []) {
    this.heap = [];

    for (let i = 0; i < canciones.length; i++) {
      this.push(canciones[i]);
    }
  }

  push(cancion: Cancion): void {
    this.heap.push(cancion);
    this.percolateUp();
  }

  pop(): Cancion | null {
    if (this.heap.length === 0) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop() || null;
    }

    const cancionMayor: Cancion = this.heap[0];
    const ultimaCancion: Cancion | undefined = this.heap.pop();

    if (ultimaCancion) {
      this.heap[0] = ultimaCancion;
      this.percolateDown();
    }

    return cancionMayor;
  }

  peek(): Cancion | null {
    if (this.heap.length === 0) {
      return null;
    }

    return this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }

  obtenerTop(limite: number): Cancion[] {
    const copia: MaxHeap = new MaxHeap(this.heap);
    const cancionesTop: Cancion[] = [];

    while (copia.size() > 0 && cancionesTop.length < limite) {
      const cancion: Cancion | null = copia.pop();

      if (cancion) {
        cancionesTop.push(cancion);
      }
    }

    return cancionesTop;
  }

  private percolateUp(): void {
    let indice: number = this.heap.length - 1;

    while (indice > 0) {
      const indicePadre: number = Math.floor((indice - 1) / 2);

      if (this.heap[indicePadre].popularidad >= this.heap[indice].popularidad) {
        break;
      }

      this.swap(indicePadre, indice);
      indice = indicePadre;
    }
  }

  private percolateDown(): void {
    let indice: number = 0;
    const longitud: number = this.heap.length;

    while (true) {
      const indiceIzquierdo: number = 2 * indice + 1;
      const indiceDerecho: number = 2 * indice + 2;
      let indiceMayor: number = indice;

      if (
        indiceIzquierdo < longitud &&
        this.heap[indiceIzquierdo].popularidad >
          this.heap[indiceMayor].popularidad
      ) {
        indiceMayor = indiceIzquierdo;
      }

      if (
        indiceDerecho < longitud &&
        this.heap[indiceDerecho].popularidad >
          this.heap[indiceMayor].popularidad
      ) {
        indiceMayor = indiceDerecho;
      }

      if (indiceMayor === indice) {
        break;
      }

      this.swap(indice, indiceMayor);
      indice = indiceMayor;
    }
  }

  private swap(primerIndice: number, segundoIndice: number): void {
    const temporal: Cancion = this.heap[primerIndice];
    this.heap[primerIndice] = this.heap[segundoIndice];
    this.heap[segundoIndice] = temporal;
  }
}
export class Grafo {
  private listaAdyacencia: { [key: string]: string[] };

  constructor() {
    this.listaAdyacencia = {};
  }

  agregarNodo(nodo: string): void {
    if (!this.listaAdyacencia[nodo]) {
      this.listaAdyacencia[nodo] = [];
    }
  }

  agregarArista(primerNodo: string, segundoNodo: string): void {
    this.agregarNodo(primerNodo);
    this.agregarNodo(segundoNodo);

    if (!this.listaAdyacencia[primerNodo].includes(segundoNodo)) {
      this.listaAdyacencia[primerNodo].push(segundoNodo);
    }

    if (!this.listaAdyacencia[segundoNodo].includes(primerNodo)) {
      this.listaAdyacencia[segundoNodo].push(primerNodo);
    }
  }

  obtenerCancionesRelacionadas(tituloCancion: string): string[] {
    if (!this.listaAdyacencia[tituloCancion]) {
      return [];
    }

    return this.listaAdyacencia[tituloCancion];
  }

  imprimir(): { [key: string]: string[] } {
    return this.listaAdyacencia;
  }
}
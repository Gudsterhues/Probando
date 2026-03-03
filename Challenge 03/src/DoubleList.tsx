// src/DoubleList.tsx
import { PaginaNode, type Pagina } from "./nodePagina";

class DoubleList {
  head: PaginaNode | null;
  tail: PaginaNode | null;
  length: number;

  constructor(paginas: Pagina[]) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let i = 0; i < paginas.length; i++) {
      const nodonuevo = new PaginaNode(paginas[i]);

      if (this.head === null) {
        this.head = nodonuevo;
        this.tail = nodonuevo;
        this.length = 1;
      } else {

        nodonuevo.back = this.tail;            
        (this.tail as PaginaNode).next = nodonuevo;
        this.tail = nodonuevo;
        this.length++;
      }
    }
  }
}

export default DoubleList;
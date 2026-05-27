class NodoTrie {
  hijos: { [key: string]: NodoTrie };
  esFinDePalabra: boolean;
  palabra: string;

  constructor() {
    this.hijos = {};
    this.esFinDePalabra = false;
    this.palabra = "";
  }
}

export class Trie {
  private raiz: NodoTrie;

  constructor() {
    this.raiz = new NodoTrie();
  }

  insert(palabra: string): void {
    let actual: NodoTrie = this.raiz;
    const palabraMinuscula: string = palabra.toLowerCase();

    for (let i = 0; i < palabraMinuscula.length; i++) {
      const letra: string = palabraMinuscula[i];

      if (!actual.hijos[letra]) {
        actual.hijos[letra] = new NodoTrie();
      }

      actual = actual.hijos[letra];
    }

    actual.esFinDePalabra = true;
    actual.palabra = palabra;
  }

  search(palabra: string): boolean {
    let actual: NodoTrie = this.raiz;
    const palabraMinuscula: string = palabra.toLowerCase();

    for (let i = 0; i < palabraMinuscula.length; i++) {
      const letra: string = palabraMinuscula[i];

      if (!actual.hijos[letra]) {
        return false;
      }

      actual = actual.hijos[letra];
    }

    return actual.esFinDePalabra;
  }

  obtenerSugerencias(prefijo: string): string[] {
    let actual: NodoTrie = this.raiz;
    const prefijoMinuscula: string = prefijo.toLowerCase();

    for (let i = 0; i < prefijoMinuscula.length; i++) {
      const letra: string = prefijoMinuscula[i];

      if (!actual.hijos[letra]) {
        return [];
      }

      actual = actual.hijos[letra];
    }

    const sugerencias: string[] = [];
    this.recolectarPalabras(actual, sugerencias);

    return sugerencias;
  }

  private recolectarPalabras(nodo: NodoTrie, sugerencias: string[]): void {
    if (nodo.esFinDePalabra) {
      sugerencias.push(nodo.palabra);
    }

    for (const letra in nodo.hijos) {
      this.recolectarPalabras(nodo.hijos[letra], sugerencias);
    }
  }
}
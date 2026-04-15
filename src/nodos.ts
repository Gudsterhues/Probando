export interface Archivo {
  id: string
  titulo: string
  tipo: 'archivo'
  creadoPor: string
  padreId: string | null
  hijos: []
}

export interface Carpeta {
  id: string
  titulo: string
  tipo: 'carpeta'
  creadoPor: string
  padreId: string | null
  hijos: Nodo[]
}

export type Nodo = Archivo | Carpeta

export class ArbolNario {
  raiz: Nodo | null

  constructor(raiz: Nodo | null = null) {
    this.raiz = raiz
  }

  buscarNodo(id: string, nodo: Nodo | null = this.raiz): Nodo | null {
    if (!nodo) return null
    if (nodo.id === id) return nodo

    if (nodo.tipo === 'archivo') {
      return null
    }

    for (const hijo of nodo.hijos) {
      const encontrado = this.buscarNodo(id, hijo)
      if (encontrado) return encontrado
    }

    return null
  }

  agregarNodo(padreId: string | null, nuevoNodo: Nodo) {
    if (!this.raiz) {
      this.raiz = nuevoNodo
      return
    }

    if (padreId === null) {
      if (this.raiz.tipo === 'archivo') {
        throw new Error('La raíz no puede tener hijos')
      }

      this.raiz.hijos.push(nuevoNodo)
      return
    }

    const padre = this.buscarNodo(padreId)

    if (!padre) {
      throw new Error('No se encontró la carpeta padre')
    }

    if (padre.tipo === 'archivo') {
      throw new Error('No puedes agregar hijos a un archivo')
    }

    padre.hijos.push(nuevoNodo)
  }
}
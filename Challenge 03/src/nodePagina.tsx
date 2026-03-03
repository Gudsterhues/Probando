// src/nodePagina.tsx


export interface Pagina{
    id: number;
    url: string;

}


export class PaginaNode{
    value:Pagina;
    next: PaginaNode | null;
    back: PaginaNode | null;

    constructor(value: Pagina){
        this.value = value
        this.next = null;
        this.back = null;
    }

}
export interface Miembro {
    id: number;
    Miembro: string;
}
export class NodeMiembro {
    value: Miembro;
    next: NodeMiembro | null;
    back: NodeMiembro | null;

    constructor(value: Miembro) {
        this.value  = value;
        this.next = null;
        this.back = null;
    }
}
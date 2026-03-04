
export interface Paciente {
    id: number;
    nombre: string;
    edad: number;
}
export class NodePaciente {
    value: Paciente;
    next: NodePaciente | null;

    constructor(value: Paciente) {
        this.value = value;
        this.next = null;
    }
}
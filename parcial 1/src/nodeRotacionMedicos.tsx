export interface RotacionMedicos {
    id: number;
    DoctorEnTurno: string;
}
export class NodeRotacionMedicos {
    value: RotacionMedicos;
    next: NodeRotacionMedicos | null;

    constructor(value: RotacionMedicos) {
        this.value = value;
        this.next = null;

    }
}
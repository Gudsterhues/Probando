export interface Historial {
  id: number;
  Paciente_atendido: string;
  Doctor_atendio: string; 
}

export class NodeHistorial {
  value: Historial;
  next: NodeHistorial | null;
  back: NodeHistorial | null;

  constructor(value: Historial) {
    this.value = value;
    this.next = null;
    this.back = null;
  }
}
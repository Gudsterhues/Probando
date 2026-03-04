import { NodeHistorial, type Historial } from "./nodeHistorial";

class DoublelistHistorial {
  head: NodeHistorial | null;
  tail: NodeHistorial | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: Historial) {
    const newNode = new NodeHistorial(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return;
    }
    
    newNode.back = this.tail;
    this.tail!.next = newNode;
    this.tail = newNode;

    this.length++;
  }

  size() {
    return this.length;
  }
}

export default DoublelistHistorial;
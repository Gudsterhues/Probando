import { NodeMiembro, type Miembro } from "./nodeComite";

class DoubleCircularMiembros {
  head: NodeMiembro | null;
  tail: NodeMiembro | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: Miembro) {
    const newNode = new NodeMiembro(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;


      newNode.next = newNode;
      newNode.back = newNode;

      this.length++;
      return;
    }

    newNode.back = this.tail;
    newNode.next = this.head;

    this.tail!.next = newNode;
    this.head.back = newNode;

    this.tail = newNode;
    this.length++;
  }

}

export default DoubleCircularMiembros;
import { NodeRotacionMedicos, type RotacionMedicos } from "./nodeRotacionMedicos";

class CircularSimpleList {
  head: NodeRotacionMedicos | null;
  tail: NodeRotacionMedicos | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: RotacionMedicos) {
    const newNode = new NodeRotacionMedicos(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.tail.next = this.head; 
      this.length++;
      return;
    }

    this.tail!.next = newNode;
    this.tail = newNode;
    this.tail.next = this.head; 
    this.length++;
  }

}

export default CircularSimpleList;
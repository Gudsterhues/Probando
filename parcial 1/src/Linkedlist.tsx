import { NodePaciente, type Paciente } from './nodePacientes';

class LinkedList {
  head: NodePaciente | null;
  tail: NodePaciente | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value: Paciente) {
    const newNode = new NodePaciente(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return;
    } else {
      if (this.tail) this.tail.next = newNode;
      this.tail = newNode;   
      this.length++;
    }
  }

  remove(value: Paciente, current = this.head) {
    if (!this.head) return null;

    if (this.head.value === value) {
      this.head = this.head.next;

      if (this.head) {
      } else {
        this.tail = null;
      }

      this.length--;
      return;
    }

    while (current && current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current && current.next) {
      current.next = current.next.next;

      if (current.next) {
      } else {
        this.tail = current; 
      }

      this.length--;
    }
  }
}

export default LinkedList;
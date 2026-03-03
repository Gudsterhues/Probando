// src/LinkedList.tsx
import { MusicNode, type Song } from './nodeMusica';

class LinkedList {
  head: MusicNode | null;
  tail: MusicNode | null;
  length: number;

  constructor(songs: Song[]) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let i = 0; i < songs.length; i++) {
      const newNode = new MusicNode(songs[i]);

      if (this.head === null) {
        this.head = newNode;
        this.tail = newNode;
        this.length = 1;
      } else {
        (this.tail as MusicNode).next = newNode;
        this.tail = newNode;
        this.length++;
      }
    }
  }
}

export default LinkedList;
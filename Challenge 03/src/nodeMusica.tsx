// src/nodeMusica.tsx


export interface Song {
  id: number;
  title: string;
  artist: string;
}

export class MusicNode {
  value: Song;
  next: MusicNode | null;

  constructor(value: Song) {
    this.value = value;
    this.next = null;
  }
}
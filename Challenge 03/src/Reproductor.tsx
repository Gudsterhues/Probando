// src/Reproductor.tsx
import { useState } from 'react';
import LinkedList from './LinkedList';
import type { MusicNode, Song } from './nodeMusica';

const mockSongs: Song[] = [
  { id: 1, title: 'DtMF', artist: 'Bad Bunny' },
  { id: 2, title: 'Turista', artist: 'Bad Bunny' },
  { id: 3, title: 'Blinding Lights', artist: 'The Weeknd' },
];

// se crea una sola vez (como cuando defines datos arriba en clase)
const list = new LinkedList(mockSongs);

function Reproductor() {
  const [currentNode, setCurrentNode] = useState<MusicNode | null>(list.head);

  const nextSong = () => {
    if (currentNode && currentNode.next) {
      setCurrentNode(currentNode.next);
    }
  };

  const restart = () => {
    setCurrentNode(list.head);
  };

  if (!currentNode) {
    return <p>No songs loaded</p>;
  }

  return (
    <>
      <h2>Mini Player</h2>

      <p>Now playing: {currentNode.value.title}</p>
      <p>Artist: {currentNode.value.artist}</p>

      <button onClick={restart}>
        Restart
      </button>

      <button onClick={nextSong} disabled={currentNode.next === null}>
        Next
      </button>
    </>
  );
}

export default Reproductor;
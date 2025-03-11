export interface Song {
  id: number;
  title: string;
  artist: string;
  fileTitle: string;
  likes?: number;  // Añadir la propiedad likes
}

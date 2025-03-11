export class Song {
  id: number;
  title: string;
  fileTitle: string;
  likes: number = 0; // Asegúrate de que likes siempre tenga un valor inicial

  constructor(id: number, title: string, fileTitle: string, likes?: number) {
    this.id = id;
    this.title = title;
    this.fileTitle = fileTitle;
    this.likes = likes ?? 0; // Si no se pasa un valor para likes, lo asigna a 0
  }
}

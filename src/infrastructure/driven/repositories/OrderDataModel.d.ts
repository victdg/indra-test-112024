export type OrderDataModel = {
  nombreCliente: string;
  fechaRegistro: string;
  idEpisodio: number;
  dataFilm: Omit<DataFilmModel, "idEpisodio">;
};

export type DataFilmModel = {
  titulo: string;
  idEpisodio: number;
  introduccion: string;
  director: string;
  productor: string;
  fechaPublicacion: string;
  personajes: Array<string>;
  planetas: Array<string>;
  naves: Array<string>;
  vehiculos: Array<string>;
  especies: Array<string>;
  creado: string;
  editado: string;
  url: string;
};

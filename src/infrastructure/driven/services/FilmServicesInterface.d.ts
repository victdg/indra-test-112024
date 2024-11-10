import { InfrastructureResponse } from "../../../domain/models/InfrastructureResponse";
import { FilmDataModel } from "./FilmDataModel";

export interface FilmServicesInterface {
  getFilm(idMovie: string): Promise<InfrastructureResponse<FilmDataModel>>;
}

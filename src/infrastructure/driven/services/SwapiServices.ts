import axios, { AxiosResponse } from "axios";
import { FilmServicesInterface } from "./FilmServicesInterface";
import { InfrastructureResponse } from "../../../domain/models/InfrastructureResponse";
import { FilmDataModel } from "./FilmDataModel";
import { constants, responseObjectMaker } from "../../../utils";

export class SwapiServices implements FilmServicesInterface {
  async getFilm(
    idMovie: string
  ): Promise<InfrastructureResponse<FilmDataModel>> {
    try {
      const axiosResponse: AxiosResponse = await axios.get(
        `${constants.FILMS_URL}/${idMovie}`
      );
      const film: FilmDataModel = axiosResponse.data;
      return {
        statusCode: constants.CODES[200].statusCode,
        data: film,
      };
    } catch (error) {
      console.log("Swapi Service error::>>", error);
      return {
        statusCode: error.response.status,
      };
    }
  }
}

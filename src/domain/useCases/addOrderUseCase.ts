import { DataFilmModel } from "../../infrastructure/driven/repositories/OrderDataModel";
import { OrdersRepositoryInterface } from "../../infrastructure/driven/repositories/OrdersRepositoryInterface";
import { FilmServicesInterface } from "../../infrastructure/driven/services/FilmServicesInterface";
import { constants, mapper } from "../../utils";
import { AddOrderRequest } from "../models/AddOrderRequest";
import { UseCaseResponse } from "../models/UseCaseResponse";

interface UseCaseType {
  execute(request: AddOrderRequest): Promise<UseCaseResponse<undefined>>;
}

export class AddOrderUseCase implements UseCaseType {
  ordersRepository: OrdersRepositoryInterface;
  filmServices: FilmServicesInterface;

  constructor({
    ordersRepository,
    filmServices,
  }: {
    ordersRepository: OrdersRepositoryInterface;
    filmServices: FilmServicesInterface;
  }) {
    this.ordersRepository = ordersRepository;
    this.filmServices = filmServices;
  }
  async execute(request: AddOrderRequest) {
    try {
      if (request.body.idEpisodio === undefined) {
        return {
          statusCode: constants.CODES[400].statusCode,
          message: constants.CODES[400].message,
        };
      }

      const getFilmResponse = await this.filmServices.getFilm(
        request.body.idEpisodio
      );

      if (getFilmResponse.statusCode === constants.CODES[404].statusCode) {
        return {
          statusCode: constants.CODES[422].statusCode,
          code: constants.CODES[422].code,
          message: `No se encontró el idEpisodio: ${request.body.idEpisodio}`,
        };
      }

      if (getFilmResponse.statusCode !== constants.CODES[200].statusCode) {
        const statusCode = getFilmResponse.statusCode;
        return {
          statusCode,
          code: constants.CODES[statusCode],
          message: constants.CODES[statusCode],
        };
      }

      const dataFilm = getFilmResponse.data!;
      const { episode_id, ...dataFilmInput } = dataFilm;

      const putOrderResponse = await this.ordersRepository.putOrder({
        nombreCliente: request.body.nombreCliente,
        fechaRegistro: new Date().toLocaleString(),
        idEpisodio: request.body.idEpisodio,
        dataFilm: <Omit<DataFilmModel, "idEpisodio">>mapper(dataFilmInput),
      });

      if (putOrderResponse.statusCode !== constants.CODES[200].statusCode) {
        const statusCode = putOrderResponse.statusCode;
        return {
          statusCode,
          code: constants.CODES[statusCode].code,
          message: constants.CODES[statusCode].message,
        };
      }

      return {
        statusCode: constants.CODES[200].statusCode,
        code: constants.CODES[200].code,
      };
    } catch (error) {
      return {
        statusCode: constants.CODES[500].statusCode,
        code: constants.CODES[500].code,
        message: constants.CODES[500].message,
      };
    }
  }
}

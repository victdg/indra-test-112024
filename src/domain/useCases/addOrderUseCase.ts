import { DataFilmModel } from "../../infrastructure/driven/repositories/OrderDataModel";
import { OrdersRepositoryInterface } from "../../infrastructure/driven/repositories/OrdersRepositoryInterface";
import { FilmServicesInterface } from "../../infrastructure/driven/services/FilmServicesInterface";
import { constants, mapper, responseObjectMaker } from "../../utils";
import { AddOrderRequest } from "../models/AddOrderRequest";
import { UseCaseResponse } from "../models/UseCaseResponse";

export interface AddOrderUseCaseType {
  execute(request: AddOrderRequest): Promise<UseCaseResponse<undefined>>;
}

export class AddOrderUseCase implements AddOrderUseCaseType {
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
    console.log("request::>>", request);
    try {
      if (
        request.body.idEpisodio === undefined ||
        request.body.nombreCliente === undefined
      ) {
        return responseObjectMaker({
          statusCode: constants.CODES[400].statusCode,
        });
      }

      const getFilmResponse = await this.filmServices.getFilm(
        request.body.idEpisodio
      );

      if (getFilmResponse.statusCode === constants.CODES[404].statusCode) {
        return responseObjectMaker({
          statusCode: constants.CODES[404].statusCode,
          message: `No se encontró el idEpisodio: ${request.body.idEpisodio}`,
        });
      }

      if (getFilmResponse.statusCode !== constants.CODES[200].statusCode) {
        const statusCode = getFilmResponse.statusCode;
        return responseObjectMaker({
          statusCode: constants.CODES[503].statusCode,
        });
      }

      const dataFilm = getFilmResponse.data!;
      const { episode_id, ...dataFilmInput } = dataFilm;

      const putOrderResponse = await this.ordersRepository.putOrder({
        nombreCliente: request.body.nombreCliente,
        fechaRegistro: new Date().toLocaleString("en-GB", {
          timeZone: "America/Lima",
          hour12: false,
        }),
        idEpisodio: request.body.idEpisodio,
        dataFilm: <Omit<DataFilmModel, "idEpisodio">>mapper(dataFilmInput),
      });

      console.log("putOrderResponse::>>", putOrderResponse);

      if (putOrderResponse.statusCode !== constants.CODES[200].statusCode) {
        const statusCode = putOrderResponse.statusCode;
        return responseObjectMaker({
          statusCode: constants.CODES[503].statusCode,
        });
      }

      return responseObjectMaker({
        statusCode: constants.CODES[200].statusCode,
        code: constants.CODES[200].code,
      });
    } catch (error) {
      console.log("useCase error::>>", error.message);
      return responseObjectMaker({
        statusCode: constants.CODES[500].statusCode,
      });
    }
  }
}

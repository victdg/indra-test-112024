import assert from "assert";
import { goodFilmData } from "./mock";
import { AddOrderRequest } from "../../../src/domain/models/AddOrderRequest";
import { AddOrderUseCase } from "../../../src/domain/useCases/addOrderUseCase";
import { OrdersRepositoryInterface } from "../../../src/infrastructure/driven/repositories/OrdersRepositoryInterface";
import { FilmServicesInterface } from "../../../src/infrastructure/driven/services/FilmServicesInterface";

describe("putOrdersUseCase test", () => {
  let ordersRepository: OrdersRepositoryInterface;
  let filmServices: FilmServicesInterface;

  it("Bad Parameteres, useCase returns 400", async () => {
    const request = { body: {} };
    ordersRepository = {
      async getOrderByClientName() {
        throw new Error("");
      },
      //   @ts-ignore
      async putOrder() {
        return Promise.resolve();
      },
    };
    const getOrderUseCase = new AddOrderUseCase({
      ordersRepository,
      filmServices,
    });
    const useCaseReponse = await getOrderUseCase.execute(
      request as AddOrderRequest
    );
    assert.equal(useCaseReponse.statusCode, 400);
  });

  it("filmServices returns 404, useCase returns 422", async () => {
    const request = { body: { nombreCliente: "JuanP", idEpisodio: 123 } };
    filmServices = {
      async getFilm() {
        return Promise.resolve({ statusCode: 404 });
      },
    };

    const getOrderUseCase = new AddOrderUseCase({
      ordersRepository,
      filmServices,
    });

    const useCaseReponse = await getOrderUseCase.execute(
      request as AddOrderRequest
    );
    assert.equal(useCaseReponse.statusCode, 422);
  });

  it("filmServices returns 503, useCase returns 503", async () => {
    const request = { body: { nombreCliente: "JuanP", idEpisodio: 123 } };
    filmServices = {
      async getFilm() {
        return Promise.resolve({ statusCode: 503 });
      },
    };

    const getOrderUseCase = new AddOrderUseCase({
      ordersRepository,
      filmServices,
    });

    const useCaseReponse = await getOrderUseCase.execute(
      request as AddOrderRequest
    );
    assert.equal(useCaseReponse.statusCode, 503);
  });

  it("putOrder returns 503, useCase returns 503 ", async () => {
    const request = { body: { nombreCliente: "JuanP", idEpisodio: 123 } };
    filmServices = {
      async getFilm() {
        return Promise.resolve({ statusCode: 200, data: goodFilmData });
      },
    };

    ordersRepository = {
      async getOrderByClientName() {
        throw new Error("");
      },
      //   @ts-ignore
      async putOrder(input) {
        console.log("putOrder inputData::>>", input);
        return Promise.resolve({ statusCode: 503 });
      },
    };

    const getOrderUseCase = new AddOrderUseCase({
      ordersRepository,
      filmServices,
    });

    const useCaseReponse = await getOrderUseCase.execute(
      request as AddOrderRequest
    );
    assert.equal(useCaseReponse.statusCode, 503);
  });
});

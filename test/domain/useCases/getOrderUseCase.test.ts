import assert from "assert";
import { GetOrderRequest } from "../../../src/domain/models/GetOrderRequest";
import { GetOrderUseCase } from "../../../src/domain/useCases/getOrderUseCase";
import { OrdersRepositoryInterface } from "../../../src/infrastructure/driven/repositories/OrdersRepositoryInterface";

describe("getOrdersUseCase test", () => {
  let ordersRepository: OrdersRepositoryInterface;

  it("Bad Parameteres, useCase returns 400", async () => {
    const request = {};
    ordersRepository = {
      async getOrderByClientName() {
        throw new Error("");
      },
      //   @ts-ignore
      async putOrder() {
        return Promise.resolve();
      },
    };
    const getOrderUseCase = new GetOrderUseCase({ ordersRepository });
    const useCaseReponse = await getOrderUseCase.execute(
      request as GetOrderRequest
    );
    assert.equal(useCaseReponse.statusCode, 400);
  });

  it("data not found, useCase returns 404", async () => {
    const request = { pathParameters: { nombreCliente: 123 } };
    ordersRepository = {
      async getOrderByClientName() {
        return Promise.resolve({ statusCode: 404 });
      },
      //   @ts-ignore
      async putOrder() {
        return Promise.resolve();
      },
    };
    const getOrderUseCase = new GetOrderUseCase({ ordersRepository });
    const useCaseReponse = await getOrderUseCase.execute(request);
    assert.equal(useCaseReponse.statusCode, 404);
  });

  it("data found, useCase returns 200", async () => {
    const request = { pathParameters: { nombreCliente: 123 } };
    ordersRepository = {
      async getOrderByClientName() {
        return Promise.resolve({ statusCode: 200, data: [] });
      },
      //   @ts-ignore
      async putOrder() {
        return Promise.resolve();
      },
    };
    const getOrderUseCase = new GetOrderUseCase({ ordersRepository });
    const useCaseReponse = await getOrderUseCase.execute(request);
    assert.equal(useCaseReponse.statusCode, 200);
  });
  // it("", async ()=>{})
  // it("", async ()=>{})
  // it("", async ()=>{})
  // it("", async ()=>{})
  // it("", async ()=>{})
  // it("", async ()=>{})
  // it("", async ()=>{})
});

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { OrdersRepositoryServices } from "../../../../src/infrastructure/driven/repositories/OrdersRepositoryServices";
import { CustomDynamoClient } from "../../../../src/infrastructure/driven/repositories/DynamoDBClient";
import assert from "assert";

describe("OrderRepositoryTest", () => {
  let customDynamoClient: CustomDynamoClient;

  // No es necesario mockear
  it("CustomDynamoClient throws error, getOrderByCLientName returns 503", async () => {
    customDynamoClient = {
      client: new DynamoDBClient(),
      start() {},
      async send(command) {
        throw new Error("CustomError");
      },
    };
    const ordersRepositoryServices = new OrdersRepositoryServices(
      customDynamoClient
    );
    const repositoryResponse =
      await ordersRepositoryServices.getOrderByClientName("juanp");
    assert.equal(repositoryResponse.statusCode, 503);
    assert.equal(repositoryResponse.message, "CustomError");
  });

  it("CustomDynamoClient doesnt return Items, getOrderByCLientName returns 404", async () => {
    customDynamoClient = {
      client: new DynamoDBClient(),
      start() {
        console.log("CustomDynamoClient Start");
      },
      //@ts-ignore
      async send(command) {
        return Promise.resolve({ Items: undefined });
      },
    };
    const ordersRepositoryServices = new OrdersRepositoryServices(
      customDynamoClient
    );
    const repositoryResponse =
      await ordersRepositoryServices.getOrderByClientName("juanp");
    assert.equal(repositoryResponse.statusCode, 404);
  });

  it("CustomDynamoClient returns empty array Items, getOrderByCLientName returns 404", async () => {
    customDynamoClient = {
      client: new DynamoDBClient(),
      start() {
        console.log("CustomDynamoClient Start");
      },
      //@ts-ignore
      async send(command) {
        return Promise.resolve({ Items: [] });
      },
    };
    const ordersRepositoryServices = new OrdersRepositoryServices(
      customDynamoClient
    );
    const repositoryResponse =
      await ordersRepositoryServices.getOrderByClientName("juanp");
    assert.equal(repositoryResponse.statusCode, 404);
  });

  it("CustomDynamoClient returns no empty array Items, getOrderByCLientName returns 200", async () => {
    customDynamoClient = {
      client: new DynamoDBClient(),
      start() {
        console.log("CustomDynamoClient Start");
      },
      //@ts-ignore
      async send(command) {
        return Promise.resolve({ Items: [{}] });
      },
    };
    const ordersRepositoryServices = new OrdersRepositoryServices(
      customDynamoClient
    );
    const repositoryResponse =
      await ordersRepositoryServices.getOrderByClientName("juanp");
    assert.equal(repositoryResponse.statusCode, 200);
  });

  it("CustomDynamoClient throws error, putOrderByCLientName returns 503", async () => {
    customDynamoClient = {
      client: new DynamoDBClient(),
      start() {},
      async send(command) {
        throw new Error("CustomError");
      },
    };
    const ordersRepositoryServices = new OrdersRepositoryServices(
      customDynamoClient
    );
    // @ts-ignore
    const repositoryResponse = await ordersRepositoryServices.putOrder({});
    assert.equal(repositoryResponse.statusCode, 503);
    assert.equal(repositoryResponse.message, "CustomError");
  });

  it("CustomDynamoClient doesnt throw error, putOrderByCLientName returns 200", async () => {
    customDynamoClient = {
      client: new DynamoDBClient(),
      start() {},
      async send(command) {
        return Promise.resolve(undefined);
      },
    };
    const ordersRepository = new OrdersRepositoryServices(customDynamoClient);
    // @ts-ignore
    const repositoryResponse = await ordersRepository.putOrder({});
    assert.equal(repositoryResponse.statusCode, 200);
  });

  // ----------------------
  it("should handle undefined Items in getOrderByClientName", async () => {
    customDynamoClient = {
      client: new DynamoDBClient(),
      start() {},
      //@ts-ignore
      async send(command) {
        return Promise.resolve({ Items: undefined });
      },
    };
    const ordersRepositoryServices = new OrdersRepositoryServices(
      customDynamoClient
    );
    const repositoryResponse =
      await ordersRepositoryServices.getOrderByClientName("juanp");
    assert.equal(repositoryResponse.statusCode, 404);
  });

  it("should handle error in getOrderByClientName", async () => {
    customDynamoClient = {
      client: new DynamoDBClient(),
      start() {},
      async send(command) {
        throw new Error("CustomError");
      },
    };
    const ordersRepositoryServices = new OrdersRepositoryServices(
      customDynamoClient
    );
    const repositoryResponse =
      await ordersRepositoryServices.getOrderByClientName("juanp");
    assert.equal(repositoryResponse.statusCode, 503);
    assert.equal(repositoryResponse.message, "CustomError");
  });

  it("should handle error in putOrder", async () => {
    customDynamoClient = {
      client: new DynamoDBClient(),
      start() {},
      async send(command) {
        throw new Error("CustomError");
      },
    };
    const ordersRepositoryServices = new OrdersRepositoryServices(
      customDynamoClient
    );
    // @ts-ignore
    const repositoryResponse = await ordersRepositoryServices.putOrder({});
    assert.equal(repositoryResponse.statusCode, 503);
    assert.equal(repositoryResponse.message, "CustomError");
  });
});

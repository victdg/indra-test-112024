import { APIGatewayProxyHandler } from "aws-lambda";
import { GetOrderUseCase } from "./domain/useCases/getOrderUseCase";
import { AddOrderUseCase } from "./domain/useCases/addOrderUseCase";

import { AddOrderApiGatewayHandlerMaker } from "./infrastructure/driving/AddOrderApiGateway";
import { GetOrderApiGatewayHandlerMaker } from "./infrastructure/driving/GetOrderApiGateway";

import { CustomDynamoClient } from "./infrastructure/driven/repositories/DynamoDBClient";
import { OrdersRepositoryServices } from "./infrastructure/driven/repositories/OrdersRepositoryServices";
import { SwapiServices } from "./infrastructure/driven/services/SwapiServices";

const myCustomDynamoCLient = new CustomDynamoClient();
const ordersRepository = new OrdersRepositoryServices(myCustomDynamoCLient);
const filmServices = new SwapiServices();

const addOrderUseCase = new AddOrderUseCase({ ordersRepository, filmServices });
const getOrderuseCase = new GetOrderUseCase({ ordersRepository });

export const addOrderApigateway: APIGatewayProxyHandler =
  AddOrderApiGatewayHandlerMaker(addOrderUseCase);

export const getOrderApiGateway: APIGatewayProxyHandler =
  GetOrderApiGatewayHandlerMaker(getOrderuseCase);

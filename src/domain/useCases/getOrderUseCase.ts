import { OrdersRepositoryInterface } from "../../infrastructure/driven/repositories/OrdersRepositoryInterface";
import { constants, responseObjectMaker } from "../../utils";
import { GetOrderRequest } from "../models/GetOrderRequest";
import { UseCaseResponse } from "../models/UseCaseResponse";

export interface GetOrderUseCaseType {
  execute(request: GetOrderRequest): Promise<UseCaseResponse<any>>;
}

export class GetOrderUseCase implements GetOrderUseCaseType {
  ordersRepository: OrdersRepositoryInterface;

  constructor({
    ordersRepository,
  }: {
    ordersRepository: OrdersRepositoryInterface;
  }) {
    this.ordersRepository = ordersRepository;
  }
  async execute(request: GetOrderRequest) {
    try {
      if (!request.pathParameters?.nombreCliente) {
        return responseObjectMaker({
          statusCode: constants.CODES[400].statusCode,
        });
      }

      const getOrderResponse = await this.ordersRepository.getOrderByClientName(
        request.pathParameters.nombreCliente
      );

      if (getOrderResponse.statusCode === constants.CODES[404].statusCode) {
        return responseObjectMaker({ statusCode: getOrderResponse.statusCode });
      }

      if (getOrderResponse.statusCode !== constants.CODES[200].statusCode) {
        return responseObjectMaker({
          statusCode: constants.CODES[503].statusCode,
        });
      }

      return responseObjectMaker({
        data: getOrderResponse.data,
      });
    } catch (error) {
      console.log("getOrders useCase error::>>", error.message);
      return responseObjectMaker({
        statusCode: constants.CODES[500].statusCode,
      });
    }
  }
}

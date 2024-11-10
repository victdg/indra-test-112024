import { InfrastructureResponse } from "../../../domain/models/InfrastructureResponse";
import { OrderDataModel } from "./OrderDataModel";

export interface OrdersRepositoryInterface {
  getOrderByClientName(
    name: string
  ): Promise<InfrastructureResponse<Array<OrderDataModel>>>;
  putOrder(order: OrderDataModel): Promise<InfrastructureResponse<undefined>>;
}

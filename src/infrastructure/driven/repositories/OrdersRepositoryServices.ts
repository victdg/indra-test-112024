import { InfrastructureResponse } from "../../../domain/models/InfrastructureResponse";
import { constants } from "../../../utils";
import { DynamoClient } from "./DynamoDBClient";
import { OrderDataModel } from "./OrderDataModel";
import { OrdersRepositoryInterface } from "./OrdersRepositoryInterface";
import {
  PutCommand,
  QueryCommand,
  QueryCommandOutput,
} from "@aws-sdk/lib-dynamodb";

export class OrdersRepositoryServices implements OrdersRepositoryInterface {
  dynamoCLient: DynamoClient;

  constructor(dynamoClient) {
    this.dynamoCLient = dynamoClient;
  }

  async getOrderByClientName(
    nombreCliente: string
  ): Promise<InfrastructureResponse<Array<OrderDataModel>>> {
    try {
      const params = {
        TableName: constants.TABLE_NAME,
        KeyConditionExpression: "nombreCliente = :nombreCliente",
        ExpressionAttributeValues: { ":nombreCliente": nombreCliente },
      };

      this.dynamoCLient.start();
      const sendResponse = (await this.dynamoCLient.send(
        new QueryCommand(params)
      )) as QueryCommandOutput;

      if (sendResponse.Items === undefined || sendResponse.Items.length === 0) {
        return {
          statusCode: constants.CODES[404].statusCode,
        };
      }

      return {
        statusCode: constants.CODES[200].statusCode,
        data: sendResponse.Items as Array<OrderDataModel>,
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: constants.CODES[503].statusCode,
        message: error.message,
      };
    }
  }

  async putOrder(
    order: OrderDataModel
  ): Promise<InfrastructureResponse<undefined>> {
    try {
      const params = {
        TableName: constants.TABLE_NAME,
        Item: order,
      };

      this.dynamoCLient.start();
      await this.dynamoCLient.send(new PutCommand(params));
      return { statusCode: constants.CODES[200].statusCode };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: constants.CODES[503].statusCode,
        message: error.message,
      };
    }
  }
}

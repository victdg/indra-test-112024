import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  ScanCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb"; // ES6 import

type CommandType = PutCommand | QueryCommand | ScanCommand | GetCommand;

export class CustomDynamoClient {
  client: DynamoDBClient;

  constructor() {
    console.log(`DynamoDBClient constructor called`);
  }

  start() {
    this.client = new DynamoDBClient();
  }

  async send(command: any) {
    const sendResponse = await this.client.send(command);
    return sendResponse;
  }
}

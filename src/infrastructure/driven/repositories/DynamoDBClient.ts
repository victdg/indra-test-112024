import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  ScanCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb"; // ES6 import

type CommandType = PutCommand | QueryCommand | ScanCommand | GetCommand;

export class DynamoClient {
  client: DynamoDBClient;
  documentClient: DynamoDBDocumentClient;

  start() {
    this.client = new DynamoDBClient();
    this.documentClient = DynamoDBDocumentClient.from(this.client);
  }

  async send(command: any) {
    const sendResponse = await this.documentClient.send(command);
    return sendResponse;
  }
}

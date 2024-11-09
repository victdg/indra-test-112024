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
    console.log("CustomDynamoClient started");
  }

  async send(command: any) {
    console.log("before send");
    const sendResponse = await this.client.send(command);
    return sendResponse;
  }
}

// import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import {
//   PutCommand,
//   QueryCommand,
//   ScanCommand,
//   GetCommand,
// } from "@aws-sdk/lib-dynamodb"; // ES6 import

// type CommandType = PutCommand | QueryCommand | ScanCommand | GetCommand;

// export class CustomDynamoClient {
//   client: DynamoDBClient;

//   constructor() {
//     console.log("DynamoDBClient constructor called");
//   }

//   start() {
//     this.client = new DynamoDBClient();
//     console.log("CustomDynamoClient started");
//   }

//   async send(command: any) {
//     console.log("before send");
//     let sendResponse: any;
//     try {
//       console.log("Sending command:", command);
//       sendResponse = await this.client.send(command);
//       console.log("Command sent successfully");
//     } catch (error) {
//       console.error("Error sending command:", error);
//     }
//     console.log("after send");
//     return sendResponse;
//   }
// }

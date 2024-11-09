import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export const testDynamoDB = async () => {
  const dynamoDbClient = new DynamoDBClient({ region: "us-east-1" });
  const params = {
    TableName: "Orders",
    KeyConditionExpression: "nombreCliente = :nombreCliente",
    ExpressionAttributeValues: {
      ":nombreCliente": "victor",
    },
  };

  try {
    const response = await dynamoDbClient.send(new QueryCommand(params));
    console.log("response in testDynamo::>>", response);
  } catch (e) {
    console.error(e.message);
  }
};

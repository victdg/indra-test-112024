import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { AddOrderUseCaseType } from "../../domain/useCases/addOrderUseCase";
import { constants } from "../../utils";

export const AddOrderApiGatewayHandlerMaker =
  (useCase: AddOrderUseCaseType) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      console.log("Hello from AddOrder");
      console.log("event::>>", event);

      if (!event.body) {
        const { statusCode, code, message } = constants.CODES[400];
        return { statusCode, body: JSON.stringify({ code, message }) };
      }

      const { statusCode, code, message } = await useCase.execute({
        body: JSON.parse(event.body),
      });

      return { statusCode, body: JSON.stringify({ status: code, message }) };
    } catch (error) {
      console.log("Apigateway error::>>", error.message);
      const { statusCode, code, message } = constants.CODES[500];
      return { statusCode, body: JSON.stringify({ code, message }) };
    }
  };

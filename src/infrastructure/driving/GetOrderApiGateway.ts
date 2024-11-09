import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { GetOrderUseCaseType } from "../../domain/useCases/getOrderUseCase";

export const GetOrderApiGatewayHandlerMaker =
  (useCase: GetOrderUseCaseType) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log("GetOrderApiGateway");
    console.log("event::>>", event);
    const { pathParameters } = event;
    const useCaseResponse = await useCase.execute({ pathParameters });
    console.log("useCaseResponse::>>", useCaseResponse);
    return {
      statusCode: useCaseResponse.statusCode,
      body: JSON.stringify({
        data: useCaseResponse.data,
        status: useCaseResponse.code,
        message: useCaseResponse.message,
      }),
    };
  };

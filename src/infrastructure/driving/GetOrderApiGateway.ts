import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { GetOrderUseCaseType } from "../../domain/useCases/getOrderUseCase";

export const GetOrderApiGatewayHandlerMaker =
  (useCase: GetOrderUseCaseType) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { pathParameters } = event;
    const useCaseResponse = await useCase.execute({ pathParameters });
    return {
      statusCode: useCaseResponse.statusCode,
      body: JSON.stringify({
        data: useCaseResponse.data,
        status: useCaseResponse.code,
        message: useCaseResponse.message,
      }),
    };
  };

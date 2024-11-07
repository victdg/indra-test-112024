import { APIGatewayProxyHandler } from "aws-lambda";
import axios, { AxiosResponse } from "axios";

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log("start");
  try {
    const axiosResponse: AxiosResponse = await axios.get(
      "https://swapi.py4e.com/api/films/"
    );
    console.log("axiosResponse::>>", axiosResponse);
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ name: "victor z", version: "2" }),
  };
};

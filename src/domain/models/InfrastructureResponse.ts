export type InfrastructureResponse<DataType> = {
  statusCode: number;
  data?: DataType;
  message?: string;
  code?: string;
};

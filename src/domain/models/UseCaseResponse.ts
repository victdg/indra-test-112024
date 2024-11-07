export type UseCaseResponse<DataType> = {
  statusCode: number;
  code?: string;
  data?: DataType;
  message?: string;
};

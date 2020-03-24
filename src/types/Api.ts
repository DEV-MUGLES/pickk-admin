export type AxiosQueryResponse<DataType> = {
  loading: boolean;
  error: boolean;
  data: DataType;
};

export type AxiosStateResponse<DataType> = {
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
};

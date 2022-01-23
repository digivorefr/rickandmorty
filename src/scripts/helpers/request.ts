import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  method: 'get',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (endpoint: string): Promise<AxiosResponse<any, any>> => instance.request({
  url: endpoint,
});

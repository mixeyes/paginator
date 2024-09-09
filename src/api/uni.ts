import { AxiosResponse } from 'axios';
import { axiosInstance } from './instance';
import { IUni } from '../types/uni';

export const getUni = async (country = 'United States'): Promise<AxiosResponse<IUni[]>> => {
  const queryString = `country=${country.split(' ').join('+')}`;

  const data = await axiosInstance.get(`search?${queryString}`);
  return data;
};

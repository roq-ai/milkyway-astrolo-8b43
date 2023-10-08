import queryString from 'query-string';
import { BirthchartInterface, BirthchartGetQueryInterface } from 'interfaces/birthchart';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBirthcharts = async (
  query?: BirthchartGetQueryInterface,
): Promise<PaginatedInterface<BirthchartInterface>> => {
  return fetcher('/api/birthcharts', {}, query);
};

export const createBirthchart = async (birthchart: BirthchartInterface) => {
  return fetcher('/api/birthcharts', { method: 'POST', body: JSON.stringify(birthchart) });
};

export const updateBirthchartById = async (id: string, birthchart: BirthchartInterface) => {
  return fetcher(`/api/birthcharts/${id}`, { method: 'PUT', body: JSON.stringify(birthchart) });
};

export const getBirthchartById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/birthcharts/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteBirthchartById = async (id: string) => {
  return fetcher(`/api/birthcharts/${id}`, { method: 'DELETE' });
};

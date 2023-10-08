import queryString from 'query-string';
import { ReadingInterface, ReadingGetQueryInterface } from 'interfaces/reading';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getReadings = async (query?: ReadingGetQueryInterface): Promise<PaginatedInterface<ReadingInterface>> => {
  return fetcher('/api/readings', {}, query);
};

export const createReading = async (reading: ReadingInterface) => {
  return fetcher('/api/readings', { method: 'POST', body: JSON.stringify(reading) });
};

export const updateReadingById = async (id: string, reading: ReadingInterface) => {
  return fetcher(`/api/readings/${id}`, { method: 'PUT', body: JSON.stringify(reading) });
};

export const getReadingById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/readings/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteReadingById = async (id: string) => {
  return fetcher(`/api/readings/${id}`, { method: 'DELETE' });
};

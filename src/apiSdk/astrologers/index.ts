import queryString from 'query-string';
import { AstrologerInterface, AstrologerGetQueryInterface } from 'interfaces/astrologer';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAstrologers = async (
  query?: AstrologerGetQueryInterface,
): Promise<PaginatedInterface<AstrologerInterface>> => {
  return fetcher('/api/astrologers', {}, query);
};

export const createAstrologer = async (astrologer: AstrologerInterface) => {
  return fetcher('/api/astrologers', { method: 'POST', body: JSON.stringify(astrologer) });
};

export const updateAstrologerById = async (id: string, astrologer: AstrologerInterface) => {
  return fetcher(`/api/astrologers/${id}`, { method: 'PUT', body: JSON.stringify(astrologer) });
};

export const getAstrologerById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/astrologers/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteAstrologerById = async (id: string) => {
  return fetcher(`/api/astrologers/${id}`, { method: 'DELETE' });
};

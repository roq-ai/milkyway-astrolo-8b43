import queryString from 'query-string';
import { ChatInterface, ChatGetQueryInterface } from 'interfaces/chat';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getChats = async (query?: ChatGetQueryInterface): Promise<PaginatedInterface<ChatInterface>> => {
  return fetcher('/api/chats', {}, query);
};

export const createChat = async (chat: ChatInterface) => {
  return fetcher('/api/chats', { method: 'POST', body: JSON.stringify(chat) });
};

export const updateChatById = async (id: string, chat: ChatInterface) => {
  return fetcher(`/api/chats/${id}`, { method: 'PUT', body: JSON.stringify(chat) });
};

export const getChatById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/chats/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteChatById = async (id: string) => {
  return fetcher(`/api/chats/${id}`, { method: 'DELETE' });
};

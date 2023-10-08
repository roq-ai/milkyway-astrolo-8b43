import { UserInterface } from 'interfaces/user';
import { AstrologerInterface } from 'interfaces/astrologer';
import { GetQueryInterface } from 'interfaces';

export interface ChatInterface {
  id?: string;
  message: string;
  sent_at?: any;
  user_id: string;
  astrologer_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  astrologer?: AstrologerInterface;
  _count?: {};
}

export interface ChatGetQueryInterface extends GetQueryInterface {
  id?: string;
  message?: string;
  user_id?: string;
  astrologer_id?: string;
}

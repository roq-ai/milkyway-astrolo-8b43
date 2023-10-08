import { ChatInterface } from 'interfaces/chat';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AstrologerInterface {
  id?: string;
  name: string;
  experience_years: number;
  specialization: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  chat?: ChatInterface[];
  user?: UserInterface;
  _count?: {
    chat?: number;
  };
}

export interface AstrologerGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  specialization?: string;
  user_id?: string;
}

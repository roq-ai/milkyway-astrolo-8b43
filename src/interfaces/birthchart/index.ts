import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BirthchartInterface {
  id?: string;
  sun_sign: string;
  moon_sign: string;
  rising_sign: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface BirthchartGetQueryInterface extends GetQueryInterface {
  id?: string;
  sun_sign?: string;
  moon_sign?: string;
  rising_sign?: string;
  user_id?: string;
}

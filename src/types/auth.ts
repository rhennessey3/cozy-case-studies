
import { Session, User } from '@supabase/supabase-js';

export type AuthContextType = {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

export type AuthState = {
  isAuthenticated: boolean;
  session: Session | null;
  user: User | null;
  initializing: boolean;
};

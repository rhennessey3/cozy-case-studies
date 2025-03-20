
import { loginUser, logoutUser } from './authOperations';
import { useSessionManager } from './sessionManager';

export const useSupabaseAuth = () => {
  const { 
    isAuthenticated, 
    setIsAuthenticated,
    initializing, 
    session, 
    user 
  } = useSessionManager();

  const login = async (password: string): Promise<boolean> => {
    const success = await loginUser(password);
    if (success) {
      setIsAuthenticated(true);
    }
    return success;
  };

  const logout = async (): Promise<void> => {
    await logoutUser();
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    initializing,
    session,
    user,
    login,
    logout
  };
};

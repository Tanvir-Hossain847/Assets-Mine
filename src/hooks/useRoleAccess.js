import { useAuth } from "@/contexts/AuthContext";
import { isAdmin, isUser } from "@/lib/roles";

export const useRoleAccess = () => {
  const { user } = useAuth();

  return {
    user,
    isAdmin: user ? isAdmin(user) : false,
    isUser: user ? isUser(user) : false,
    hasRole: (role) => user?.role === role,
    isAuthenticated: !!user,
  };
};

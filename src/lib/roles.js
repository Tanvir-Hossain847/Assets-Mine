// Role management utilities
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

export const checkRole = (user, requiredRole) => {
  if (!user) return false;
  return user.role === requiredRole;
};

export const isAdmin = (user) => {
  return checkRole(user, ROLES.ADMIN);
};

export const isUser = (user) => {
  return checkRole(user, ROLES.USER);
};

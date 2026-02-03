export const getAuthConfig = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('User is not authenticated');
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

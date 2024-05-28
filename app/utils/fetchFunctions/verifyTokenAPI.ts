
// Function that verifies token (both exp and is it valid altogether)
export const verifyToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verifyToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error('Token verification failed');
      }

      const data = await response.json();
      if (!data.valid) {
        throw new Error('Invalid token');
      }
      return true
    } catch (error) {
        return false
    }
  };
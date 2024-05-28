import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/*
HOC that takes other React FC and checks if token is provided in local storage
*/
const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      // Check if token exists in local storage
      const token = localStorage.getItem('token');
      if (!token) {
        // If token doesn't exist, redirect to login page
        router.push('/login');
      }
    }, []); // Only run once when the component mounts

    // Render the wrapped component
    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;

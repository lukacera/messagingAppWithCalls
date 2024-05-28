import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { verifyToken } from '../utils/fetchFunctions/verifyTokenAPI';

/*
HOC that takes other React FC and checks if token is provided in local storage
*/
const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {

    const router = useRouter();
    const pathname = usePathname();

    // Function that runs everyhting 
    const runCheck = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return
      }

      const isValid = await verifyToken(token);
      if (!isValid) {
        router.push("/login")
        return
      }

    }
   

    useEffect(() => {
      runCheck()
    }, [pathname, router]); // Run the effect whenever the pathname changes

    // Render the wrapped component
    return <WrappedComponent {...props} />;
  };

};

export default withAuth;

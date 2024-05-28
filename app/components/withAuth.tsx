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
    
    // If user 
    
    // Function that runs everyhting 
    const runCheck = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return
      }

      const isValid = await verifyToken(token);
      console.log ("Is token valid? :" + isValid)
      // Remove token from lcoal storage if it is not valid 
      if (!isValid) {
        localStorage.removeItem("token")
        router.push("/login")
        return
      }

      // If token is valid and user is currently at login or register page
      // redirect him to home page
      if (pathname === "/login" || pathname === "/register") {
        router.push("/home");
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

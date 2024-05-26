"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    
    // If token does not exist, redirect to login page
    if (!token) {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      {/* Your home page content */}
    </div>
  );
};

export default HomePage;
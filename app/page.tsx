"use client"

import { useRouter } from 'next/navigation';
import withAuth from './components/withAuth';

const HomePage = () => {
  const router = useRouter();

  return (
    <div>
      {/* Your home page content */}
    </div>
  );
};

export default withAuth(HomePage);
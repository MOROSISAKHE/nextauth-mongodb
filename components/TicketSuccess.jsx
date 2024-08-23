'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const TicketSuccess = ({ redirectUrl, message, delay = 5000 }) => {
  const router = useRouter();

  useEffect(() => {
    // Redirect after the specified delay
    const timer = setTimeout(() => {
      router.push(redirectUrl);
    }, delay);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [router, redirectUrl, delay]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">{message}</h1>
        <p className="text-center text-gray-600">
          You will be redirected in {delay / 1000} seconds...
        </p>
      </div>
    </div>
  );
};

export default TicketSuccess;

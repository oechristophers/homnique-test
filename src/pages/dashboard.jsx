import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const router = useRouter()

  useEffect(() => {
    // Accessing localStorage only after the component has mounted
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSignOut = () => {
  router.push('/auth/login'); // Redirect to the login page
  };

  return (
    <div className="flex flex-col items-center px-2 justify-center min-h-screen ">
      <div className="flex flex-col items-center py-20 md:p-8 rounded-xl  box-shadow gap-4 md:w-[60%]">
        <div className="text-black text-3xl font-bold w-full text-center ">Welcome to your dashboard {username || 'Guest'}</div>
        <div>
          <p className='text-xl'>Your role is: Keyworker</p>
        </div>
        <div className="text-2xl mt-4 mb-4">
         Some more dashboard stuff
        </div>
        <div>
          <button
            onClick={handleSignOut}
            className="py-3 px-5 rounded-full text-sm cursor-pointer font-bold text-white bg-[hsl(208,86%,48%)] hover:bg-[hsl(208,86%,58%)]"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

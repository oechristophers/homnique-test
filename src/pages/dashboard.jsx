import CreateUser from "@/components/Admin/CreateUser";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Accessing localStorage only after the component has mounted
    const storedUsername = localStorage.getItem("userName");
    const role = localStorage.getItem("userRole");
    if (storedUsername) {
      setUsername(storedUsername);
      setRole(role);
    }
  }, []);

  const handleSignOut = () => {
    router.push("/auth/login"); // Redirect to the login page
  };

  return (
    <div className="flex flex-col items-center px-2 justify-center min-h-screen ">
      <div className="flex flex-col items-center py-20 md:p-8 rounded-xl  box-shadow gap-4 ">
        <div className="text-black text-3xl font-bold w-full text-center md:w-[60%] ">
          Welcome to your dashboard {username || "Guest"}
        </div>
        <div>
          <p className="text-xl">Your role is: {role}</p>
        </div>
        <div className="text-2xl mt-4 mb-4">Some more dashboard stuff</div>
        
        <div className="flex gap-4">
        <button
              onClick={() => setCreating(!creating)}
              className="py-3 px-5 rounded-full text-sm cursor-pointer font-bold text-white bg-[hsl(208,86%,48%)] hover:bg-[hsl(208,86%,58%)]"
            >
             {creating? 'Cancel':  '+ Add User'}
            </button>
          <button
            onClick={handleSignOut}
            className="py-3 px-5 rounded-full text-sm cursor-pointer font-bold text-white bg-[hsl(208,86%,48%)] hover:bg-[hsl(208,86%,58%)]"
          >
            Sign Out
          </button>
        </div>
        {role === "Admin" && (
          <div className="md:w-full justify-center flex items-center gap-4">
            
            {creating && <CreateUser />}
          </div>
        )}
      </div>
    </div>
  );
}

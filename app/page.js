import React from 'react';
const Page = () => {





  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-7xl font-extrabold  mb-4">Trackchieve</h1>
      <h2 className="text-2xl font-semibold mb-2">
         Track your Steam Achievements
      </h2>
      <p className="text-center text-gray-300 max-w-md mb-8">
        Unlock your gaming accomplishments: View, track, and manage your Steam achievements with ease.
      </p>

      <div className="bg-background p-6 rounded-2xl border border-primary shadow-lg">
        <h3 className="text-lg font-Inter mb-4 text-center">Sign in</h3>
        
        <button className="flex items-center justify-center w-full mb-4 p-3 border border-primary  hover:bg-purple-800 text-white font-medium py-2 rounded-lg transition">
          <img src="/assets/Steam_icon.png" alt="Steam" className="h-6 w-6 mr-2"/>
          Steam Sign in
        </button>
        
        <button className="flex items-center justify-center w-full border border-primary hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition">
          Guest Login
        </button>
      </div>
    </div>
  );
};

export default Page;

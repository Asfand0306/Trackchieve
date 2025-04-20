'use client'; // This is a client component
import React from 'react';
import GameLibrary from '../components/GameLibrary'; // Import the GameLibrary component

const GuestPreview = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-7xl font-extrabold mb-4">Trackchieve</h1>
      <p className="text-center text-gray-300 max-w-md mb-8">
        Unlock your gaming accomplishments: View, track, and manage your Steam achievements with ease.
      </p>

      <div className="bg-background p-6 rounded-2xl border border-primary shadow-lg w-full max-w-4xl">
        <GameLibrary />
      </div>
    </div>
  );
};

export default GuestPreview;
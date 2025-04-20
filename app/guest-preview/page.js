'use client'; // This is a client component
import React from 'react';
import GameLibrary from '../components/GameLibrary'; // Import the GameLibrary component

const GuestPreview = () => {
  return (
    <div>
    <header class="bg-background border border-primary rounded-lg flex justify-between items-center px-4 py-2 m-4">
        <div class="text-white text-lg font-semibold">Trackchieve</div>
        <button class="bg-secondary text-white font-medium px-4 py-1 rounded-full hover:bg-secondary-dark transition">
            SIGN IN
        </button>
    </header>
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-7xl font-extrabold mb-4">Trackchieve</h1>
      <p className="text-center text-gray-300 max-w-md mb-8">
        Unlock your gaming accomplishments: View, track, and manage your Steam achievements with ease.
      </p>

      <div className="bg-background p-6 rounded-2xl border border-primary shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold">GameLibrary</h2>
        <GameLibrary />
      </div>
    </div>
    </div>
  );
};

export default GuestPreview;
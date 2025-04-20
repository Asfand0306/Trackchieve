'use client';
import GameLibrary from "../components/GameLibrary";
import Profile from "../components/Profile";
import { useAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-white text-2xl font-bold">Trackchieve</h1>
        <button 
          onClick={handleLogout}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Log Out
        </button>
      </div>

      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h2 className="text-white text-3xl font-semibold mb-2">
          Welcome <span className="text-purple-400">{user.displayName}</span> to your DASHBOARD
        </h2>
        <p className="text-gray-400">
          Access your steam profile and game achievements below.
        </p>
      </div>

      {/* Profile and Game Library */}
      <div className="max-w-4xl mx-auto">
        <Profile userData={user} />
        <GameLibrary />
      </div>
    </div>
  );
};

export default HomePage;
import GameLibrary from "../components/GameLibrary";
import Profile from "../components/Profile";

const HomePage = () => {
    return (
      <div className="min-h-screen p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-2xl font-bold">Trackchieve</h1>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Log Out
          </button>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-white text-3xl font-semibold mb-2">
            Welcome "<span className="text-purple-400">User 1</span>" to your DASHBOARD
          </h2>
          <p className="text-gray-400">
            Access your steam profile and game achievements below.
          </p>
        </div>

        {/* Profile and Game Library */}
        <div className="max-w-4xl mx-auto">
          <Profile userData={mockUserData} />
          <GameLibrary games={mockGames} />
        </div>
      </div>
    );
  };

  export default HomePage;
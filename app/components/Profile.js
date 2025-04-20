const Profile = ({ userData }) => {
  return (
    <div className="border border-purple-500 rounded-lg p-4 mb-4">
      <h2 className="text-white text-lg font-semibold mb-4">Profile</h2>
      <div className="flex items-center">
        <img
          src={userData.photos[2].value} // Full-size avatar
          alt="Profile Avatar"
          className="w-16 h-16 rounded-lg mr-4"
        />
        <div>
          <span className="text-white text-xl block">{userData.displayName}</span>
          <span className="text-gray-400 text-sm block">SteamID: {userData.id}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
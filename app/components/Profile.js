    const Profile = ({ userData }) => {
      // Skeleton for Steam API user data
      return (
        <div className="border border-purple-500 rounded-lg p-4 mb-4">
          <h2 className="text-white text-lg font-semibold mb-4">Profile</h2>
          <div className="flex items-center">
            <img
              src={profile.avatar}
              alt="Profile Avatar"
              className="w-16 h-16 rounded-lg mr-4"
            />
            <span className="text-white text-xl">{profile.personaname}</span>
          </div>
        </div>
      );
    };
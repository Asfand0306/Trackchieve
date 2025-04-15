'use client';
import { getSteamRedirectUrl } from '../services/steamAuth';

export default function SteamLoginButton() {
  const handleLogin = async () => {
    try {
      const authUrl = await getSteamRedirectUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Steam login error:', error);
    }
  };

  return (
    <button 
      onClick={handleLogin}
      className="bg-[#171a21] hover:bg-[#2a475e] text-white px-4 py-2 rounded flex items-center"
    >
      <img 
        src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/steamworks_docs/english/sits_small.png" 
        alt="Steam logo" 
        className="mr-2 h-6"
      />
      Sign in with Steam
    </button>
  );
}
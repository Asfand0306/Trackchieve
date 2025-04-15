'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authenticateSteamUser } from '../../../services/steamAuth';
import { auth, signInWithCustomToken } from '../../../services/firebase';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        const steamId = await authenticateSteamUser();
        
        // Send steamId to your backend to get Firebase custom token
        const response = await fetch('/api/auth/steam', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ steamId }),
        });

        if (!response.ok) throw new Error('Authentication failed');

        const { token } = await response.json();
        await signInWithCustomToken(auth, token);
        
        router.push('/');
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/auth/login?error=steam_auth_failed');
      }
    };

    handleAuthentication();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Authenticating with Steam...</h1>
        <p>Please wait while we log you in.</p>
      </div>
    </div>
  );
}
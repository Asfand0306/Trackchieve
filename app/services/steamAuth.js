import SteamOpenID from 'steam-openid';

const steam = new SteamOpenID({
  realm: process.env.NEXT_PUBLIC_BASE_URL,
  returnUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
  apiKey: process.env.NEXT_PUBLIC_STEAM_API_KEY
});

export const getSteamRedirectUrl = async () => {
  return await steam.getRedirectUrl();
};

export const authenticateSteamUser = async () => {
  return await steam.authenticate();
};
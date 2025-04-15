const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Initialize Firebase Admin if not already done
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });
}

router.post('/', async (req, res) => {
  try {
    const { steamId } = req.body;
    
    if (!steamId) {
      return res.status(400).json({ error: 'Steam ID is required' });
    }

    // Here you might want to:
    // 1. Check if user exists in your DB
    // 2. Create/update user record
    // 3. Create custom token
    
    const customToken = await admin.auth().createCustomToken(steamId);
    
    res.json({ token: customToken });
  } catch (error) {
    console.error('Error generating custom token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
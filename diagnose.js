// Copy this code into a file named diagnose.js in your project root
// Run with: node diagnose.js

const checkSteamAuth = () => {
    console.log('🔍 Steam Authentication Diagnostic Tool 🔍');
    console.log('----------------------------------------');
    
    // 1. Check for Steam API Key
    const apiKey = process.env.STEAM_API_KEY;
    console.log('1. Steam API Key:');
    if (!apiKey) {
      console.log('   ❌ STEAM_API_KEY environment variable is NOT set');
      console.log('   You can set it by running: export STEAM_API_KEY=your_api_key');
    } else {
      console.log('   ✅ STEAM_API_KEY environment variable is set');
      console.log(`   API Key: ${apiKey.substring(0, 4)}... (${apiKey.length} characters)`);
    }
    
    // 2. Check for express-session setup
    console.log('\n2. Session Configuration:');
    console.log('   The session configuration should have:');
    console.log('   ✓ resave: true');
    console.log('   ✓ saveUninitialized: true');
    console.log('   ✓ cookie.secure: false (for development)');
    console.log('   ✓ cookie.sameSite: "lax"');
    
    // 3. Check for proper middleware order
    console.log('\n3. Middleware Order:');
    console.log('   Correct middleware order is:');
    console.log('   1. express.json()');
    console.log('   2. express.urlencoded()');
    console.log('   3. cors()');
    console.log('   4. session()');
    console.log('   5. passport.initialize()');
    console.log('   6. passport.session()');
    
    // 4. Common issues
    console.log('\n4. Common Issues:');
    console.log('   ✓ CORS configuration must include credentials: true');
    console.log('   ✓ Frontend fetch requests must include credentials: "include"');
    console.log('   ✓ passport.serializeUser and deserializeUser must be defined');
    console.log('   ✓ Steam Strategy returnURL must match your actual route');
    
    console.log('\n----------------------------------------');
    console.log('If you see the error "Authentication failed" in your browser:');
    console.log('1. Make sure your STEAM_API_KEY is valid and not expired');
    console.log('2. Check the server console for detailed error messages');
    console.log('3. Try accessing http://localhost:5000/auth/debug/session to view session data');
    console.log('----------------------------------------');
  };
  
  checkSteamAuth();
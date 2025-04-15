const express = require('express');
const cors = require('cors');
const steamAuthRouter = require('./auth/steam');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth/steam', steamAuthRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
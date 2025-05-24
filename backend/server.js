const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes')
const storeRoutes = require('./routes/storeRoutes')
require('dotenv').config();
const cors = require('cors')
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/store', storeRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
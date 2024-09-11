const express = require('express');
const connect = require("./common/connection");
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');

const app = express();
connect();
const PORT = 6000;

app.use(cors());
app.use(express.json());



app.use('/api', formRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
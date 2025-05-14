const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { loadModels } = require('./controllers/faceController');
const faceRoutes = require('./routes/faceRoutes');
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();
app.use(cors());
app.use(express.static("uploads"));
app.use(bodyParser.json());

app.use('/faces', faceRoutes);
app.use('/students', studentRoutes);
app.use('/attendance', attendanceRoutes);

// Load the models once the server starts
loadModels().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

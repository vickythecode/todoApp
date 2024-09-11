const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const tasksRoutes = require('./routes/tasks');
const dotenv = require("dotenv");

dotenv.config({
  path: "../.env",
});




const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/tasks', tasksRoutes);

// MongoDB Connection
async function DbConnect() {
    try {
      const DbConnect = await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connected to DB");
    } catch (error) {
      console.log("FAILED TO CONNECT DATABASE", error);
    }
  }
  DbConnect();

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})
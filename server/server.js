const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Establishing connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/trackingDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected successfully");
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
});

// Define Schemas and Models
const eventSchema = new mongoose.Schema({
  type: String,
  page: String,
  timestamp: { type: Date, default: Date.now }
});
const Event = mongoose.model('Event', eventSchema);

const timeSchema = new mongoose.Schema({
  page: String,
  duration: Number
});
const Time = mongoose.model('Time', timeSchema);

// API Routes
app.post('/api/events', (req, res) => {
  const event = new Event(req.body);
  event.save()
    .then(() => res.status(200).send('Event saved'))
    .catch(err => res.status(500).send(err.toString()));
});

app.post('/api/time', (req, res) => {
    const { page, duration } = req.body;
    const newTime = new Time({
      page,
      duration
    });

    newTime.save()
      .then(() => res.status(200).json({ message: 'Time data saved successfully' }))
      .catch(err => {
        console.error('Error saving time data:', err);
        res.status(500).json({ error: err.message });
    });
});

  
app.get('/api/events-data', (req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(500).send(err.toString()));
});

app.get('/api/time-data', (req, res) => {
  Time.find()
    .then(times => res.json(times))
    .catch(err => res.status(500).send(err.toString()));
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});

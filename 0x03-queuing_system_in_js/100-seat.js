import express from 'express';
import redis from 'redis';
import { promisify } from 'util';
import kue from 'kue';

// Import necessary libraries

// Create a Redis client
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Initialize variables
let reservationEnabled = true;

// Create a Kue queue
const queue = kue.createQueue();

// Functions
async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

async function getCurrentAvailableSeats() {
  return await getAsync('available_seats');
}

// Initialize the number of available seats to 50
reserveSeat(50);

// Express server setup
const app = express();
const port = 1245;

app.get('/available_seats', async (req, res) => {
  const availableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: availableSeats });
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: "Reservation are blocked" });
  }

  const job = queue.create('reserve_seat', {}).save((err) => {
    if (err) {
      res.json({ status: "Reservation failed" });
    } else {
      res.json({ status: "Reservation in process" });
    }
  });

  job.on('complete', () => console.log(`Seat reservation job ${job.id} completed`));
  job.on('failed', (errorMessage) => console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`));
});

app.get('/process', (req, res) => {
  queue.process('reserve_seat', async (job, done) => {
    let availableSeats = await getCurrentAvailableSeats();
    availableSeats--;

    if (availableSeats >= 0) {
      await reserveSeat(availableSeats);
      if (availableSeats === 0) {
        reservationEnabled = false;
      }
      done();
    } else {
      done(new Error("Not enough seats available"));
    }
  });

  res.json({ status: "Queue processing" });
});

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
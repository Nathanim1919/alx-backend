const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.log('Redis client not connected to the server:', err));
client.on('connect', () => console.log('Redis client connected to the server'));

function setHashValues() {
  const schools = {
    Portland: '50',
    Seattle: '80',
    'New York': '20',
    Bogota: '20',
    Cali: '40',
    Paris: '2'
  };

  Object.entries(schools).forEach(([city, value]) => {
    client.hset('HolbertonSchools', city, value, redis.print);
  });
}

function displayHash() {
  client.hgetall('HolbertonSchools', (error, object) => {
    if (error) console.error(error);
    console.log(object);
  });
}

setHashValues();
displayHash();
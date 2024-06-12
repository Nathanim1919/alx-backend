import kue from "kue";

// Create a new Kue instance
const queue = kue.createQueue();

// Create a function named sendNotification:
function sendNotification(phoneNumber, message) {
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`
  );
}

// The queue process that will listen to new jobs on push_notification_code:
queue.process("push_notification_code", (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message);
  done();
});
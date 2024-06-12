import kue from "kue";

// array of blacklisted phone numbers
const BLACKLISTED_NUMBERS = ["4153518780", "4153518781"];

const sendNotification = (phoneNumber, message, job, done) => {
    let total = 2, pending = 2; // Initialize total and pending tasks
    const sendInterval = setInterval(() => { // Set up an interval to simulate the sending process
      if (total - pending <= total / 2) { // If less than or equal to half of the total tasks are pending
        job.progress(total - pending, total); // Update job progress
      }
  
      // Check if the phone number is blacklisted
      if (BLACKLISTED_NUMBERS.includes(phoneNumber)) {
        const error = new Error(`Phone number ${phoneNumber} is blacklisted`);
        done(error); // Call the done callback with an error
        clearInterval(sendInterval); // Clear the interval to stop the simulation
        return; // Exit the function
      }
  
      // Log message when starting to send notification
      if (total === pending) {
        console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
      }
  
      // Decrement pending tasks and call done if all tasks are completed
      --pending || done();
  
      // Clear interval when done
      pending || clearInterval(sendInterval);
    }, 1000); // Run the interval every 1000 milliseconds (1 second)
  };
  

const queue = kue.createQueue();
/*
Create a queue with Kue that will proceed job of the queue push_notification_code_2 with two jobs at a time.
*/
queue.process("push_notification_code_2", 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
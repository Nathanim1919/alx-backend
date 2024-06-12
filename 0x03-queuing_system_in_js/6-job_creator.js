import kue from "kue";

// Create a new Kue instance
const queue = kue.createQueue();

// Create a new job
const jobData = {
  phoneNumber: "1234567890",
  message: "This is the code to verify your account",
};

const job = queue.create("push_notification_code", jobData).save((err) => {
  if (!err) console.log(`Notification job created: ${job.id}`);
});

// If the job is completed, log to the console
job.on("complete", () => console.log("Notification job completed"));

// If the job fails, log to the console
job.on("failed", () => console.log("Notification job failed"));

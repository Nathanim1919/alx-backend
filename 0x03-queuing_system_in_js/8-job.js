function createPushNotificationsJobs(jobs, queue){
    if (!Array.isArray(jobs)) throw Error('Jobs is not an array');

    jobs.forEach((jobInfo) => {
        const job = queue.create('push_notification_code_3', jobInfo);

        job
            .on('enqueue', () => {
                console.log(`Notification job created: ${job.id}`);
            })
            .on('complete', () => {
                console.log(`Notification job ${job.id} completed`);
            })
            .on('failed', () => {
                console.log(`Notification job ${job.id} failed: Error`);
            })
            .on('progress', (progress) => {
                console.log(`Notification job ${job.id} ${progress}% complete`);
            });

        job.save((err) => {
            if (!err) console.log(`Notification job created: ${job.id}`);
        });
    })
}

module.exports = createPushNotificationsJobs;
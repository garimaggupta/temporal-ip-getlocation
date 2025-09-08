import { NativeConnection, Worker } from '@temporalio/worker';
import * as activities from './activities';
import { TASK_QUEUE_NAME } from './shared';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, './.env'), override: true });

let connectionObj = {}
let namespace = 'default';

if (process.env.USE_CLOUD === 'Y') {
  connectionObj = {
    address: process.env.TEMPORAL_ADDRESS,
    tls: true,
    apiKey: process.env.TEMPORAL_API_KEY,
  }
  namespace = process.env.TEMPORAL_NAMESPACE as string;

} else {
  connectionObj = {
    address: 'localhost:7233',
  }
}


async function run() {
  // Step 1: Establish a connection with Temporal server.

  const connection = await NativeConnection.connect(connectionObj);
  try {
    // Step 2: Register Workflows and Activities with the Worker.
    const worker = await Worker.create({
      connection,
      namespace: namespace,
      taskQueue: TASK_QUEUE_NAME,
      // Workflows are registered using a path as they run in a separate JS context.
      workflowsPath: require.resolve('./workflows'),
      activities,
    });

    // Step 3: Start accepting tasks on the Task Queue specified in TASK_QUEUE_NAME
    //
    // The worker runs until it encounters an unexpected error or the process receives a shutdown signal registered on
    // the SDK Runtime object.
    console.log('Worker running');
    await worker.run();
  } finally {
    // Close the connection once the worker has stopped
    await connection.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
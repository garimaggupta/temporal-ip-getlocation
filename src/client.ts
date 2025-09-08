import { Connection, Client } from '@temporalio/client';
import { nanoid } from 'nanoid';
import { TASK_QUEUE_NAME } from './shared';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, './.env'), override: true });

// import your workflow
import { getAddressFromIP } from './workflows';

async function run() {

  let connectionObj = {};
  let namespace = 'default';

  if (process.env.USE_CLOUD === 'Y')  {
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
  
  const connection = await Connection.connect(connectionObj);


  const client = new Client({
    connection,
    namespace: namespace // connects to 'default' namespace if not specified
  });

  const handle = await client.workflow.start(getAddressFromIP, {
    taskQueue: TASK_QUEUE_NAME,
    args: [process.argv[2] ?? 'Temporal'],
    workflowId: 'workflow-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

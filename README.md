# Temporal IP-GEOLOCATION


-  Activity Definitions to `src/activities.ts`.
-  Workflow Definitions to `src/workflows.ts`.
-  task queue name in `src/shared.ts`.

## Running the code

Install dependencies with `npm install`.

Run `temporal server start-dev` to start [Temporal Server](https://github.com/temporalio/cli/#installation).


1. In a shell, run `npm run start.watch` to start the Worker and reload it when code changes.
1. In another shell, run `npm run workflow` to run the Workflow Client.
]
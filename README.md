# Temporal IP-GEOLOCATION


-  Activity Definitions to `src/activities.ts`.
-  Workflow Definitions to `src/workflows.ts`.
-  task queue name in `src/shared.ts`.

## Running the code

Install dependencies with `npm install`.

## Connect to Local Dev Temporal Server

Run `temporal server start-dev` to start local [Temporal Server](https://github.com/temporalio/cli/#installation).
Ensure USE_CLOUD environment variable is set to N in .env file.

## Connect to Temporal Cloud
Update the .env file with Temporal Cloud Credentials and set USE_CLOUD environment variable to Y

## Run Application
The `package.json` file contains scripts for running the client, the Worker, and tests.

1. In a shell, run `npm run start.watch` to start the Worker and reload it when code changes.
1. In another shell, run `npm run workflow` to run the Workflow Client.

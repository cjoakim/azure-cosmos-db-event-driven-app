# azure-cosmos-db-event-driven-app

Example "Event-Driven" application with Azure Cosmos DB, Functions, and Service Bus.

Implemented in Node.js and TypeScript.

The instructions provided here focus on Windows 11, but similar commands
can be executed on macOS or Linux workstations.

## Architecture

<p align="center">
  <img src="docs/architecture.png" width="100%">
</p>


## Directory Structure

```
console_app\     This directory contains a Cosmos DB document producer, and a Service Bus consumer
function_app\    This directory contains a Cosmos DB Change-Feed consumer Azure Function
```

## Azure PaaS Services Used

- **Azure Cosmos DB NoSQL API**
  - database name of your choice, such as **dev**
  - container name of your choice, such as **events**
    - Partition key of this container should be **/pk**
    - Minimal Request Unit (RU) setting is adequate
- **Azure Service Bus**
  - standard tier is adequate
  - queue name of your choice, such as **events**

## Software Required

- [git](https://git-scm.com/downloads)
- [Azure Functions Core Tools V4](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local)
  - On Windows 11, download and install **v4.x - Windows 64-bit**
  - The Function Tools enable you to run Azure Functions locally on your workstation
- [Node.js](https://nodejs.org/en/download/)
  - Download and install the Latest LTS Version
- [TypeScript](https://www.typescriptlang.org/)
  - TypeScript is a language that transpiles into JavaScript
  - The generated JavaScript can be executed by Node.js, and the Azure Function runtime
- [Docker (optional)](https://www.docker.com/products/docker-desktop/)
  - Docker is optional; you can run this entire project on your workstation without it
  - The Azure Function can be deployed to Azure as a Docker image
  - A pre-build Docker image is availble on DockerHub
    - TODO

## Clone this GitHub Repository

In Windows PowerShell or a bash Terminal, navigate to a directory
such as your HOMEPATH or HOME.  Then clone this repo as follows:

```
> git clone https://github.com/cjoakim/azure-cosmos-db-event-driven-app.git
```

## Environment Variables

This application uses the following environment variables.
Configure them on your system the approprate values for
your above Cosmos DB and Service Bus.

```
AZURE_COSMOSDB_NOSQL_URI          <-- The URI of your Cosmos DB NoSQL account
AZURE_COSMOSDB_NOSQL_RW_KEY1      <-- A Cosmos DB read-write key
AZURE_COSMOSDB_NOSQL_CONN_STRING1 <-- A Cosmos DB read-write connection string
AZURE_COSMOSDB_NOSQL_DB           <-- Database name, such as 'dev'
AZURE_COSMOSDB_NOSQL_CONTAINER    <-- Container name, such as 'events'
AZURE_FUNCTION_MAX_ITEMS          <-- Number of Cosmos DB documents to process in one Azure Function invocation

AZURE_SVCBUS_CONN_STRING          <-- The connection string for your Azure Service Bus
AZURE_SVCBUS_QUEUE                <-- The queue name in your Service Bus, such as 'events'
```

These environment variables are used by both the console_app and function_app subprojects.

---

## Azure Function

### One time setup tasks

#### Install TypeScript

```
> npm install -g typescript

> npm list -g

...
`-- typescript@5.2.2     <-- see this in the list
...
```

#### Install the Azure Functions Core Tools

See https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local

Verify your installation by running the following command:

```
> func --version
4.0.5455
```

#### Install the dependent NPM packages

```
PS ...\azure-cosmos-db-event-driven-app> cd .\function_app\

PS ...\function_app> npm install

PS ...\function_app> npm list

TS-ChangeFeed@1.0.0 C:\Users\chjoakim\github\azure-cosmos-db-event-driven-app\function_app
+-- @azure/functions@4.1.0
+-- @azure/service-bus@7.9.3
+-- @types/node@18.18.9
+-- azure-functions-core-tools@4.0.5455
+-- rimraf@5.0.5
`-- typescript@4.9.5
```

### Start the Azure Function locally

```
> PS ...\function_app> tsc             <-- compile the TypeScript code

> PS ...\function_app> func start      <-- start the local Function App

Azure Functions Core Tools
Core Tools Version:       4.0.5455 Commit hash: N/A  (64-bit)
Function Runtime Version: 4.27.5.21554

[2023-11-14T18:43:24.418Z] Cosmos DB dbname: dev, cname: events, maxItemsPerInvocation: 1
[2023-11-14T18:43:24.421Z] Service Bus queue name: events
[2023-11-14T18:43:24.488Z] Worker process started and initialized.

Functions:

        cosmosDBTrigger1: cosmosDBTrigger

For detailed output, run func with --verbose flag.

...
[2023-11-14T20:49:31.104Z] Executing 'Functions.cosmosDBTrigger1' (Reason='New changes on container events at 2023-11-14T20:49:31.1042339Z', Id=f9268dee-b4c8-4465-afcc-e1fa58e0ffba)
[2023-11-14T20:49:31.107Z] 1 documents passed to this Function invocation
[2023-11-14T20:49:31.108Z] Executed 'Functions.cosmosDBTrigger1' (Succeeded, Id=f9268dee-b4c8-4465-afcc-e1fa58e0ffba, Duration=3ms)
[2023-11-14T20:49:31.107Z] {
  "body": "{\"id\":\"f1765e83-0dd0-4eda-ba64-a832328d1df6\",\"pk\":\"MCO\",\"country\":\"United States\",\"city\":\"Orlando\",\"latitude\":\"28.429394\",\"longitude\":\"-81.308994\",\"altitude\":\"96\",\"enqueueDate\":\"2023-11-14T20:49:31.106Z\"}"
}
[2023-11-14T20:49:31.221Z] Executing 'Functions.cosmosDBTrigger1' (Reason='New changes on container events at 2023-11-14T20:49:31.2210260Z', Id=01a5e4ab-adb4-4a1e-9da4-91f9784f9c33)
[2023-11-14T20:49:31.224Z] Executed 'Functions.cosmosDBTrigger1' (Succeeded, Id=01a5e4ab-adb4-4a1e-9da4-91f9784f9c33, Duration=3ms)
[2023-11-14T20:49:31.224Z] 1 documents passed to this Function invocation
...
```

---

## Console App

Install and list the npm libraries, similar to the above.

```
PS ...\azure-cosmos-db-event-driven-app> cd .\console_app\

PS ...\console_app> npm install

PS ...\console_app> npm list

console-app@0.1.0 C:\Users\chjoakim\github\azure-cosmos-db-event-driven-app\console_app
+-- @azure/cosmos@4.0.0
+-- @azure/identity@3.3.0
+-- @azure/service-bus@7.9.3
+-- @types/node@18.17.1
+-- @types/uuid@9.0.1
+-- azu-js@1.0.2
+-- rimraf@5.0.1
`-- uuid@9.0.1
```

### Cosmos DB Document Producer

Edit file **generate_events.ps1** as necessary, then execute it as follows.

```
PS ...\console_app> .\generate_events.ps1

dbname is dev per command-line arg
cname is events per command-line arg
newIds is true per command-line arg
sleepMs is 3000 per command-line arg
50 airports loaded from infile data/world-airports-50.json
...
---
-
{"name":"Orlando Intl","city":"Orlando","country":"United States","iata_code":"MCO","latitude":"28.429394","longitude":"-81.308994","altitude":"96","timezone_num":"-5","timezone_code":"America/New_York","location":{"type":"Point","coordinates":[-81.308994,28.429394]},"id":"f1765e83-0dd0-4eda-ba64-a832328d1df6","pk":"MCO"}
idx: 48, createResp: {
  "name": "Orlando Intl",
  "city": "Orlando",
  "country": "United States",
  "iata_code": "MCO",
  "latitude": "28.429394",
  "longitude": "-81.308994",
  "altitude": "96",
  "timezone_num": "-5",
  "timezone_code": "America/New_York",
  "location": {
    "type": "Point",
    "coordinates": [
      -81.308994,
      28.429394
    ]
  },
  "id": "f1765e83-0dd0-4eda-ba64-a832328d1df6",
  "pk": "MCO",
  "_rid": "gm8hAIWrwNn5AAAAAAAAAA==",
  "_self": "dbs/gm8hAA==/colls/gm8hAIWrwNk=/docs/gm8hAIWrwNn5AAAAAAAAAA==/",
  "_etag": "\"01015853-0000-0100-0000-6553dd560000\"",
  "_attachments": "attachments/",
  "_ts": 1699994966
}
...
```

It will read the **data/world-airports-50.json** file in this repo
and write each airport as a document to your Cosmos DB container.
It logs both the Airport as read from the file, and also the
resulting Cosmos DB response document.

The Azure Function should be triggered by these new documents.

### Service Bus Consumer

```
PS ...\console_app> .\read_service_bus_queue.ps1

...
---
Received 3 messages
-
{"id":"2ad12f0b-d857-46d6-8c06-65bf018fcd69","pk":"JFK","country":"United States","city":"New York","latitude":"40.639751","longitude":"-73.778925","altitude":"13","enqueueDate":"2023-11-14T20:49:25.617Z"}
-
{"id":"6f9ee543-2984-4b2f-8b8c-ae0f9a888acf","pk":"ORD","country":"United States","city":"Chicago","latitude":"41.978603","longitude":"-87.904842","altitude":"668","enqueueDate":"2023-11-14T20:49:25.731Z"}
-
{"id":"c10fd6b1-c01d-4478-a74c-3be68e83ce7c","pk":"CLT","country":"United States","city":"Charlotte","latitude":"35.214","longitude":"-80.943139","altitude":"748","enqueueDate":"2023-11-14T20:49:25.834Z"}
---
Received 2 messages
-
{"id":"b6cfb7e5-b874-479d-bd66-d9d99085f6b9","pk":"LAS","country":"United States","city":"Las Vegas","latitude":"36.080056","longitude":"-115.15225","altitude":"2141","enqueueDate":"2023-11-14T20:49:30.992Z"}
-
{"id":"f1765e83-0dd0-4eda-ba64-a832328d1df6","pk":"MCO","country":"United States","city":"Orlando","latitude":"28.429394","longitude":"-81.308994","altitude":"96","enqueueDate":"2023-11-14T20:49:31.106Z"}
No more messages to receive
closing the Service Bus receiver...
closing the Service Bus client...
```

This program will simply read and display the messages from
the Azure Service Bus queue.  These messages were created 
by the Change-feed Azure Function.


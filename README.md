# azure-cosmos-db-event-driven-app

Example "Event-Driven" application with Azure Cosmos DB, Functions, and Service Bus.
Implemented in Node.js and TypeScript.

The instructions provided here focus on Windows 11, but similar commands
can be executed on macOS or Linux workstations.

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
    - Minimal Request Unit setting is adequate
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

then

> cd azure-cosmos-db-event-driven-app
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
PS ...\console_app> generate_events.ps1
```

It will read the **data/world-airports-50.json** file in this repo
and write each airport as a document to your Cosmos DB container.
The Azure Function should be triggered by these new documents.

### Service Bus Consumer

```
PS ...\console_app> read_service_bus.ps1
```

This program will simply read and display the messages from
the Azure Service Bus queue.  These messages were created 
by the Change-feed Azure Function.


# Console App

This is a Node.js/TypeScript console application that can be used to
execute the following functions:

- Upsert documents in Cosmos DB NOSQL API to trigger Change-Feed events
  - See the function_app in this repo which consumes these events
- Consume messages from an Azure Service Bus queue
  - These messages were written by the function_app

---

## Use

Clone this GitHub repository and navigate to this directory.

```
> https://github.com/cjoakim/azure-cosmos-db.git

> cd azure-cosmos-db\other\functions\changefeed\event_generator
```

### Environment Variables

Set the following environment variables with values that correspond
to your Cosmos DB NoSQL Account.

```
AZURE_COSMOSDB_NOSQL_URI          <-- the URI of your Cosmos DB account
AZURE_COSMOSDB_NOSQL_RW_KEY1      <-- a read-write key
```

### Install TypeScript

```
PS ...\event_generator> npm install -g typescript

PS ...\event_generator> npm list -g

...
`-- typescript@5.2.2     <-- see this in the list
...
```

### Install the dependent libraries for this project

```
PS ...\event_generator> npm install
```

### Compile the TypeScript code into JavaScript

```
PS ...\event_generator> tsc
```

### Execute the Cosmos DB NoSQL API document loading stream

```
PS ...\event_generator> node .\dist\index.js createChangeFeedEvents dev events --new-ids --sleep-ms:3000

--or--

PS ...\event_generator> .\generate_events.ps1
```

In this example **dev** is the name of the database, and **events** is the container
within the database.  The container is assumed to have the partition key attribute
**/pk**.

See file **data/world-airports-50.json** for the documents that are loaded.
This file already has **id** values for each airport document.
To generate new id values, include the **--new-ids** command-line arg.

The default sleep time between documents is 1-second.  But this can be
overridden with the **--sleep-ms:3000** command-line arg.
In this example the value is 3000 milliseconds.


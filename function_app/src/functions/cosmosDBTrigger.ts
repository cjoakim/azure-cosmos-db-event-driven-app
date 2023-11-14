import { app, InvocationContext } from '@azure/functions';
import {
    ServiceBusClient,
    ServiceBusMessage,
    ServiceBusMessageBatch,
    ServiceBusSender } from "@azure/service-bus";

// The Cosmos DB triggering database name, container name, and maxItemsPerInvocation
// are configured with the following environment variables:
let dbname   : string = process.env['AZURE_COSMOSDB_NOSQL_DB'] || 'dev';
let cname    : string = process.env['AZURE_COSMOSDB_NOSQL_CONTAINER'] || 'test';
let maxItems : string = process.env['AZURE_FUNCTION_MAX_ITEMS'] || '1';
let maxItemsPerInvocation : number = maxItemsAsNumber(maxItems);

// Configure the Azure Service Bus output queue
let svcBusConnStr : string = process.env['AZURE_SVCBUS_CONN_STRING'] || '?';
let svcBusQueue   : string = process.env['AZURE_SVCBUS_QUEUE'] || '?';
let firstEvent : boolean = true;
const sbClient : ServiceBusClient = new ServiceBusClient(svcBusConnStr);
const sbSender : ServiceBusSender = sbClient.createSender(svcBusQueue);

console.log(`Cosmos DB dbname: ${dbname}, cname: ${cname}, maxItemsPerInvocation: ${maxItemsPerInvocation}`);
console.log(`Service Bus queue name: ${svcBusQueue}`);

export async function cosmosDBEventHandler(documents: unknown[], context: InvocationContext): Promise<void> {
    // if (firstEvent) {
    //     await new Promise(f => setTimeout(f, 1000));  // pause to allow the ServiceBusClient to connect
    //     firstEvent = false;
    // }
    if (documents) {
        if (documents.length > 0) {
            context.log(`${documents.length} documents passed to this Function invocation`);
            for (let i = 0; i < documents.length; i++) {
                try {
                    let doc = documents[i] as object;
                    if (doc) {
                        await processDocument(doc, context, sbSender);
                    } 
                }
                catch(error) {
                    context.log(`ERROR processing document ${i} ${error}`); 
                }
            }
        }
    }
}

async function processDocument(
    doc : object,
    context : InvocationContext,
    sbSender : ServiceBusSender) : Promise<void> {

    let sbm : ServiceBusMessage = {
        body: JSON.stringify(doc),
    }
    context.log(JSON.stringify(sbm, null, 2));
    sbSender.sendMessages(sbm);
    return;
}

function maxItemsAsNumber(max : string) : number {
    try {
        return parseInt(max);
    }
    catch(error) {
        return 1;
    }
}

// Note: there is no function.json file for this runtime v4 Azure Function.
// Instead it is configured as follows:
app.cosmosDB('cosmosDBTrigger1', {
    connection: 'AZURE_COSMOSDB_NOSQL_CONN_STRING1',
    databaseName: dbname,
    containerName: cname,
    createLeaseContainerIfNotExists: true,
    maxItemsPerInvocation: maxItemsPerInvocation,
    handler: cosmosDBEventHandler
});
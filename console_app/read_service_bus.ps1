
# PowerShell script to read and drain the Azure Service Bus queue.
#
# Chris Joakim, Microsoft, 2023

tsc

node .\dist\index.js readServiceBusQueue --sleep-ms:1000 --batch-size:3 --max-batches:5

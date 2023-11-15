/**
 * This class is used to transform the Cosmos DB Change-Feed
 * documents into messages to be sent to Azure Service Bus.
 * Because it is a separate module, it can be unit tested.
 * 
 * Chris Joakim, Microsoft, 2023
 */


export class EventTransformer {
    

    // constructor() {
    //     this.logger = AzuLogger.buildDefaultLogger('FileUtil');
    // }

    /**
     * Return the current directory where this node.js process is running.
     */
    cwd() : string {
        return process.cwd();
    }

}

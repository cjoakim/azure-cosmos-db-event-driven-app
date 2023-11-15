/**
 * This class is used to transform the Cosmos DB Change-Feed
 * documents into messages to be sent to Azure Service Bus.
 * Because it is a separate module, it can be unit tested.
 * 
 * Chris Joakim, Microsoft, 2023
 */

export class EventTransformer {
    
    static retainAttributes : Array<string> = 'id,pk,country,city,latitude,longitude,altitude'.split(',');

    /**
     * Transform the given Cosmos DB Change-Feed document into either
     * a message object to be put on the Service Bus queue, or 'undefined'
     * if the document doesn't require further downstream processing.
     */
    transform(doc : object, hostname : string) : object | undefined {

        if ('country' in doc) {
            if (doc['country'] === 'United States') {
                let message = {};
                for (let i = 0; i < EventTransformer.retainAttributes.length; i++) {
                    let attr = EventTransformer.retainAttributes[i];
                    if (attr in doc) {
                        message[attr] = doc[attr];
                    }
                }
                // Add several system-generated attributes for traceability:
                message['_message_date'] = new Date().toISOString();
                message['_message_version'] = '1';
                message['_function_hostname'] = hostname;
                return message;
            }  
        }
        return;
    }
}

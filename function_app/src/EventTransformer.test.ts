// Unit tests for class EventTransformer
// Chris Joakim, Microsoft, 2023

// npm test --testPathPattern EventTransformer

import os from "os";

import { EventTransformer } from "./EventTransformer";
import { FileUtil } from "./FileUtil";

const hostname = os.hostname();
const fu : FileUtil = new FileUtil();

function epochTime() : number {
    return Date.now().valueOf();
}

function getSampleDocument(iataCode : string) : object {
    let documents : Array<object> = fu.readJsonArrayFile('../data/world-airports-50.json');
    for (let i = 0; i < documents.length; i++) {
        let doc : object = documents[i];
        if (doc["iata_code"] === iataCode) {
            return doc;
        }
    }
    return {};
}

test("EventTransformer: transform to message", () => {
    let et: EventTransformer = new EventTransformer();
    let doc = getSampleDocument('ATL');
    let msg = et.transform(doc, hostname);
    expect(msg).toBeTruthy();
});

test("EventTransformer: transform to undefined", () => {
    let et: EventTransformer = new EventTransformer();
    let doc = getSampleDocument('YYZ');
    let msg = et.transform(doc, hostname);
    expect(msg).toBeUndefined();
});

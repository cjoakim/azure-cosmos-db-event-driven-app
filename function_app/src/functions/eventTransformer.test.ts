// Unit tests for class EventTransformer
// Chris Joakim, Microsoft, 2023

// npm test --testPathPattern EventTransformer

import path from "path";
import util from "util";

import { EventTransformer } from "./eventTransformer";

function epochTime() : number {
    return Date.now().valueOf();
}

test("EventTransformer: xxx", () => {
    // let fu = new FileUtil();
    // let cwd : string = fu.cwd();
    // let endsWell : boolean = cwd.endsWith('azu-js');
    // //console.log(cwd);
    // expect(cwd).toContain('azu-js');
    // expect(endsWell).toBe(true);
    expect(42).toBeTruthy();
});

/**
 * Utility class for local filesystem operations.
 * 
 * To read huge text files, consider using a line-by-line streaming approach
 * in your application code rather than using this class.
 * Chris Joakim, Microsoft, 2023
 */

import fs from "fs";
import os from "os";
import path from "path";


export class FileUtil {
    

    /**
     * Return the current directory where this node.js process is running.
     */
    cwd() : string {
        return process.cwd();
    }

    /**
     * Return a list of files in the given directory.
     */
    listFilesInDir(dir: string) : Array<string> {
        return fs.readdirSync(dir);
    }

    /**
     * Read the given filename and return its contents as a text string.
     */
    readTextFileSync(infile: string) : string {
        try {
            let buf = fs.readFileSync(infile, 'utf8');
            return buf.toString();
        }
        catch (error) {
            return null;
        }
    }

    /**
     * Read the given filename and return its contents an array
     * of strings, one per line.
     */
    readTextFileAsLinesSync(infile: string) : Array<string> {
        try {
            let text = this.readTextFileSync(infile);
            if (text == null) {
                return null;
            }
            else {
                return text.split(os.EOL);
            }
        }
        catch (error) {
            return null;
        }
    }

    /**
     * Write the given string/text content to the given filename.
     * Return true if successful, else false.
     */
    writeTextFileSync(outfile: string, data: string) : boolean {
        try {
            fs.writeFileSync(outfile, data);
            return true;
        }
        catch (error) {
            return false;
        }
    }

    /**
     * Read the given JSON Array file and return its parsed contents.
     * The file contents must begin and end with the '[' and ']' characters.
     */
    readJsonArrayFile(infile: string): Array<Object> {
        try {
            let str : string = fs.readFileSync(infile, 'utf8');
            return JSON.parse(str);
        }
        catch (error) {
            return null;
        }
    }

    /**
     * Read the given JSON Array file and return its parsed contents.
     * The file contents must begin and end with the '{' and '}' characters.
     */
    readJsonObjectFile(infile: string): Object {
        try {
            let str : string = fs.readFileSync(infile, 'utf8');
            return JSON.parse(str);
        }
        catch (error) {
            return null;
        }
    }

    deleteFile(fn : string) : void {
        try {
            fs.unlinkSync(fn);
        }
        catch (error) {
            //
        }
        return;
    }

    deleteFilesInDir(dir : string) : void {
        try {
            let filesList = this.listFilesInDir(dir);
            for (let i = 0; i < filesList.length; i++) {
                let fn = null;
                if (dir.endsWith(path.sep)) {
                    fn = dir + filesList[i];
                }
                else {
                    fn = dir + path.sep + filesList[i];
                }
                fs.unlinkSync(fn);
            }
        }
        catch (error) {
            //this.logger.errorException(error);
        }
        return;
    }
}

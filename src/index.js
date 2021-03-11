import DriverTrackingSystem from './classes/driverTrackingSystem.js';
import fs from 'fs';
import readline from 'readline';
import stream from 'stream';
import { parseCommand } from './services/commandParsingService.js';
import {getFileName} from './services/fileInputService.js';

const fileName = getFileName();
const inStream = fs.createReadStream(fileName);
const outStream = new stream();
const rl = readline.createInterface(inStream, outStream);

const driverTrackingSystem = new DriverTrackingSystem();

rl.on('line', function(line){
    try{
        parseCommand(line.trim());
    }catch(error){
        console.log(`An error was encountered and a command was not processed. Command: "${line}", Error: "${error.message}"`);
        console.log('Program has continued processing the remainder of the commands.');
    }
});

rl.on('close', function(){
    driverTrackingSystem.sortDriversByTotalDrivingDistance().map(driver => {
        console.log(driver.formattedOutput());
    });
});
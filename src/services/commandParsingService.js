import Driver from '../classes/driver.js';
import DriverTrackingSystem from '../classes/driverTrackingSystem.js';
import Trip from '../classes/trip.js';
import {CONSTANT_DATE, DRIVER_COMMAND, TRIP_COMMAND} from '../constants/constants.js';
import assert from 'assert';

/**
* Parses a command and invokes either parseTripCommand or parseDriverCommand based on the name of the command.
* @throws if an invalid comand name is provided
* @param {String} command - the string read from the input file. Will be either a trip command, a driver command, or invalid.
*/
export const parseCommand = (command) => {
    const commandArray = command.split(' ');
    const commandName = commandArray[0];
    if(commandName === DRIVER_COMMAND){
        parseDriverCommand(commandArray);
    }else if(commandName === TRIP_COMMAND){
        parseTripCommand(commandArray);
    }else{
        throw new Error(`The only valid commands are Driver and Trip. ${commandName} is not valid.`);
    }
};

/**
* Parses a driver command and adds a driver to the driver tracking system
* @param {String} driverCommand - the string read from the input file. Will be a driver command. 
*/
const parseDriverCommand = (driverCommand) => {
    validateDriverCommand(driverCommand);
    const driverName = driverCommand[1];
    const driver = new Driver(driverName);
    DriverTrackingSystem.getInstance().addDriver(driver);
};

/**
* Parses a trip command and adds the trip to the specified driver
* @throws - when there is not a driver in with the name passed in the trip command.
* @param {String} driverCommand - the string read from the input file. Will be a trip command. 
*/
const parseTripCommand = (tripCommand) => {
    validateTripCommand(tripCommand);
    const driverName = tripCommand[1];
    const driver = DriverTrackingSystem.getInstance().retrieveDriverByName(driverName);
    if(!driver){
        throw new Error(`Trip cannot be added because ${driverName} is not a valid driver.`);
    }
    const trip = new Trip(tripCommand[2],tripCommand[3],tripCommand[4]);
    driver.addTrip(trip);
};

/**
* Validates that the driver command is in the format "Driver {driverName}"
* @param {String} driverCommand - the string read from the input file. 
* @throws if the driver command does not match the required format
*/
const validateDriverCommand = (driverCommand) => {
    const driverName = driverCommand[1];
    assert.strictEqual(driverCommand.length, 2, new Error("Driver command must be in the format 'Driver ${driverName}'."));
    assert.ok(typeof driverName === 'string', new Error('DriverName must be a string'));
};

/**
* Validates that the trip command is in the format "Trip {name} {startTime} {endTime} {milesDriven}"
* @param {String} tripCommand - the string read from the input file. 
* @throws if the trip command does not match the required format
*/
const validateTripCommand = (tripCommand) => {
    assert.strictEqual(tripCommand.length, 5, new Error("Trip Command must be in format: 'Trip {name} {startTime} {endTime} {milesDriven}"));
    const driverName = tripCommand[1];
    const startTime = tripCommand[2];
    const endTime = tripCommand[3];
    const milesDriven = tripCommand[4];
    const timeRegex = /([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]/;
    assert.ok(typeof driverName === 'string', new Error('DriverName must be a string'));
    assert.match(startTime,timeRegex, new Error('StartTime must be in format HH:mm'));
    assert.match(endTime, timeRegex, new Error('EndTime must be in format HH:mm'));
    assert.ok(Number(milesDriven), new Error('miles driven on a trip must be a number.'));
    assert.ok(new Date(CONSTANT_DATE + startTime) < new Date(CONSTANT_DATE + endTime), 'startTime must be before endTime');
};
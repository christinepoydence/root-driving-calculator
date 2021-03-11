import Driver from '../classes/driver.js';
import DriverTrackingSystem from '../classes/driverTrackingSystem.js';
import Trip from '../classes/trip.js';
import {parseCommand} from './commandParsingService.js';

beforeEach(() => {
    DriverTrackingSystem.getInstance().drivers = [];
});

test('a valid driver command is correctly parsed and the driver is added as a new driver to the DriverTrackingSystem', () => {
    const driverCommand = 'Driver Penny';
    parseCommand(driverCommand);
    const expectedDriver = new Driver('Penny');
    expect(DriverTrackingSystem.getInstance().drivers).toContainEqual(expectedDriver);
});

test('an error is thrown if an invalid Driver command is passed.', () => {
    const driverCommand = 'Driver Penny InvalidInput';
    expect(() => { parseCommand(driverCommand); }
    ).toThrow(Error("Error: Driver command must be in the format 'Driver ${driverName}'."));
});

test('an error is thrown if an invalid command is passed.', () => {
    const driverCommand = 'InvalidDriver Penny';
    expect(() => { parseCommand(driverCommand); }
    ).toThrow(Error("The only valid commands are Driver and Trip. InvalidDriver is not valid."));
});

test('a trip command throws an error if a valid driver has not been added.', () => {
    const tripCommand = 'Trip Penny 12:00 14:00 20';
    expect(() => { parseCommand(tripCommand); }
    ).toThrow(Error("Trip cannot be added because Penny is not a valid driver."));
});

test('a trip command throws an error if the start time is not before the endtime', () => {
    const tripCommand = 'Trip Penny 15:00 14:00 20';
    expect(() => { parseCommand(tripCommand); }
    ).toThrow(Error("startTime must be before endTime"));
});

test('a trip command throws an error if mils driven is not passed as a number', () => {
    const tripCommand = 'Trip Penny 15:00 14:00 twenty';
    expect(() => { parseCommand(tripCommand); }
    ).toThrow(Error("Error: miles driven on a trip must be a number."));
});

test('a valid trip command is correctly parsed and updates the DriverTrackingSystem', () => {
    const driverCommand = 'Driver Penny';
    parseCommand(driverCommand);
    const tripCommand = 'Trip Penny 12:00 14:00 20';
    parseCommand(tripCommand);
    const expectedDriver = new Driver('Penny');
    expectedDriver.addTrip(new Trip('12:00', '14:00', '20'));
    expect(DriverTrackingSystem.getInstance().drivers).toContainEqual(expectedDriver);
});

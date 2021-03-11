import DriverTrackingSystem from '../classes/driverTrackingSystem.js';
import {parseCommand} from './commandParsingService.js';

beforeEach(() => {
    DriverTrackingSystem.getInstance().drivers = [];
});

test('a driver command is correctly parsed', () => {
    const driverCommand = 'Driver Penny';
    parseCommand(driverCommand)
});

test('a trip command is correctly parsed', () => {
    const tripCommand = 'Trip Penny 12:00 14:00 20';
    parseCommand(tripCommand)
});
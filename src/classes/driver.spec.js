import Driver from './driver.js';
import Trip from './trip.js';

test('Driver can be constructed', () => {
    const driver = new Driver('Penny');
    expect(driver.driverName).toBe('Penny');
    expect(driver.trips).toEqual([]);
    expect(driver.totalMilesDriven).toEqual(0);
    expect(driver.totalTimeSpentDriving).toEqual(0);
});

test('A trip can be added to a driver using the addTrip method', () => {
    const driver = new Driver('Penny');
    const trip = new Trip('10:00','12:00', '60');
    driver.addTrip(trip);
    expect(driver.trips).toContainEqual(trip);
});

test('A trip will not be added to a driver if the average speed of the trip is less than 5mph', () => {
    const driver = new Driver('Penny');
    const trip = new Trip('10:00','12:00', '5');
    driver.addTrip(trip);
    expect(driver.trips).not.toContainEqual(trip);
});

test('A trip will not be added to a driver if the average speed of the trip is greater than 100 mph', () => {
    const driver = new Driver('Penny');
    const trip = new Trip('10:00','12:00', '500');
    driver.addTrip(trip);
    expect(driver.trips).not.toContainEqual(trip);
});

test('A trip will not be added to a driver if it is not an instance of the Trip class', () => {
    const driver = new Driver('Penny');
    const trip = 'an invalid trip';
    expect(() => { driver.addTrip(trip); }
    ).toThrow(Error('trip is not a valid instance of Trip.'));
});

test('calculateTotalMilesDriven() will correctly calculate the miles driven by the driver when only one trip has been taken', () => {
    const driver = new Driver('Penny');
    const trip = new Trip('10:00','12:00', '50');
    driver.addTrip(trip);
    expect(driver.calculateTotalMilesDriven()).toEqual(50);
});

test('calculateTotalMilesDriven() will correctly return 0 when no valid trips have been taken by a driver', () => {
    const driver = new Driver('Penny');
    expect(driver.calculateTotalMilesDriven()).toEqual(0);
});

test('calculateTotalMilesDriven() will correctly calculate the miles driven by the driver when multiple trips have been taken', () => {
    const driver = new Driver('Penny');
    const trip1 = new Trip('10:00','12:00', '50');
    const trip2 = new Trip('10:00','12:00', '50');
    const trip3 = new Trip('10:00','12:00', '75');
    driver.addTrip(trip1);
    driver.addTrip(trip2);
    driver.addTrip(trip3);
    expect(driver.calculateTotalMilesDriven()).toEqual(175);
});

test('calculateAverageSpeed() will correctly calculate the average speed of the driver when only one trip has been taken in mph', () => {
    const driver = new Driver('Penny');
    const trip = new Trip('10:00','12:00', '50');
    driver.addTrip(trip);
    expect(driver.calculateAverageSpeed()).toEqual(25);
});

test('calculateAverageSpeed() will correctly return 0 when no valid trips have been taken by a driver', () => {
    const driver = new Driver('Penny');
    expect(driver.calculateAverageSpeed()).toEqual(0);
});

test('calculateAverageSpeed() will correctly calculate the average speed of the driver when multiple trips have been taken', () => {
    const driver = new Driver('Penny');
    const trip1 = new Trip('10:00','12:00', '50');
    const trip2 = new Trip('10:00','12:00', '50');
    const trip3 = new Trip('10:00','14:00', '200');
    driver.addTrip(trip1);
    driver.addTrip(trip2);
    driver.addTrip(trip3);
    expect(driver.calculateAverageSpeed()).toEqual(38);
});

test('formattedOutput() will return a formatted string with accurate information about average speed and total distance when the driver has taken one trip', () => {
    const driver = new Driver('Penny');
    const trip = new Trip('10:00','12:00', '50');
    driver.addTrip(trip);
    expect(driver.formattedOutput()).toEqual('Penny: 50 miles @ 25 mph');
});

test('formattedOutput() will return a formatted string with accurate information abouttotal distance when the driver has taken zero trips', () => {
    const driver = new Driver('Penny');
    expect(driver.formattedOutput()).toEqual('Penny: 0 miles');
});
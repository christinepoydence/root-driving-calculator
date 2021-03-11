import Driver from './driver.js';
import DriverTrackingSystem from './driverTrackingSystem.js';
import Trip from './trip.js';

beforeEach(() => {
    DriverTrackingSystem.getInstance().drivers = [];
});

test('DriverTrackingSystem can be constructed', () => {
    const system = new DriverTrackingSystem();
    expect(system.drivers.length).toBe(0);
});

test('instance of DriverTrackingSystem is used if DriverTrackingSystem is constructed twice', () => {
    const system = new DriverTrackingSystem();    
    const system2 = new DriverTrackingSystem();
    expect(system).toEqual(system2);
});

test('getInstance() retrieves the current instance of the DriverTrackingSystem', () => {
    const system = new DriverTrackingSystem();    
    expect(system).toEqual(DriverTrackingSystem.getInstance());
});

test('addDriver() adds a new driver to the DriverTrackingSystem', () => {
    const system = new DriverTrackingSystem(); 
    const driver = new Driver('Penny');
    system.addDriver(driver);   
    expect(system.drivers).toContainEqual(driver);
});

test('addDriver() will not add the same driver to the DriverTrackingSystem multiple times', () => {
    const system = new DriverTrackingSystem(); 
    const driver = new Driver('Penny');
    system.addDriver(driver);   
    expect(() => { system.addDriver(driver);  }
    ).toThrow(Error('Penny has already been added to the system. Drivers can only be added once.'));
});

test('addDriver() does not add a new driver to the DriverTrackingSystem if the driver is not an instance of the Driver class', () => {
    const system = new DriverTrackingSystem(); 
    const driver = 'not a valid instance of Driver';
    expect(() => { system.addDriver(driver); }
    ).toThrow(Error('driver is not a valid instance of Driver.'));
});

test('retrieveDriverByName() will return the Driver that has been added to the system by name', () => {
    const system = new DriverTrackingSystem(); 
    const driver = new Driver('Penny');
    system.addDriver(driver);
    const returnedDriver = system.retrieveDriverByName('Penny');
    expect(returnedDriver).toEqual(driver);
});

test('retrieveDriverByName() will return null if the driver is not in the system', () => {
    const system = new DriverTrackingSystem(); 
    const driver = new Driver('Penny');
    system.addDriver(driver);
    const returnedDriver = system.retrieveDriverByName('UnaddedDriver');
    expect(returnedDriver).toEqual(null);
});

test('sortDriversByTotalDrivingDistance() will return an empty array if there are no drivers in the system', () => {
    const system = new DriverTrackingSystem(); 
    const sortedDrivers = system.sortDriversByTotalDrivingDistance();
    expect(sortedDrivers).toEqual([]);
});

test('sortDriversByTotalDrivingDistance() will return the drivers sorted by driving distance in either ascending or descending order', () => {
    const system = new DriverTrackingSystem(); 

    //Create new drivers
    const driver1 = new Driver('Penny');
    const driver2 = new Driver('Sam');
    const driver3 = new Driver('Jesse');

    //Add the drivers to the system
    system.addDriver(driver1);
    system.addDriver(driver2);
    system.addDriver(driver3);

    //Create trips of varying distances
    const trip1 = new Trip('12:00', '14:00', '30');
    const trip2 = new Trip('12:00', '14:00', '40');
    const trip3 = new Trip('12:00', '14:00', '50');
    
    //Add a trip to each driver
    driver1.addTrip(trip1);
    driver2.addTrip(trip2);
    driver3.addTrip(trip3);
    
    //Expect the drivers to be returned in ascending order by miles driven
    const ascendingDrivers = system.sortDriversByTotalDrivingDistance('ascending');
    expect(ascendingDrivers).toEqual([driver1,driver2,driver3]);

    //Expect the drivers to be returned in descending order by miles driven
    const descendingDrivers = system.sortDriversByTotalDrivingDistance('descending');
    expect(descendingDrivers).toEqual([driver3,driver2,driver1]);
});
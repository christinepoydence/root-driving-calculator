import Driver from './driver.js';

let instance = null;
/** Class representing a DriverTrackingSystem. */
export default class DriverTrackingSystem {
    /**
     * Create a DrivingSystem to track all the drivers.
     */
    constructor(){
        if(instance){
            return instance;
        }
        this.drivers = [];
        instance = this;
    };

    /**
     * Add a Driver to the driverTrackingSystem
     * @param {Driver} driver - the driver to be added to the system
     */
    addDriver(driver) {
        if(!(driver instanceof Driver)){
            throw new Error('driver is not a valid instance of Driver.');
        }if(this.retrieveDriverByName(driver.driverName)){
            throw new Error(`${driver.driverName} has already been added to the system. Drivers can only be added once.`);
        }
        this.drivers.push(driver);
    };

    /**
     * Retrieve a driver from the DriverTrackingSystem.
     * @param {String} driverName - the name of the driver to retrieve from the system
     * @return {Driver} The Driver with the name {driverName}
     */
    retrieveDriverByName(driverName){
        return this.drivers.find(driver => driver.driverName === driverName) || null;
    }

    /**
     * Retrieve an array of all drivers in the system sorted by their total miles driven. 
     * IMPORTANT NOTE: If order is not passed, descending order will be used.
     * @param {String} order - whether to order the drivers in ascending or decensing order by totalMilesDriven (accepts ascending and descending)
     * @return {Array} an array of all Drivers in the system, ordered by totalMilesDriven
     */
    sortDriversByTotalDrivingDistance(order){
        return this.drivers.sort(function(a, b) { 
            if(order === 'ascending'){
                return  a.totalMilesDriven - b.totalMilesDriven;
            }
            return b.totalMilesDriven - a.totalMilesDriven;
        });
    }

    /**
     * Returns the existing instance of DrivingSystem, or creates a new one if instance === null
     */
    static getInstance() {
        return instance || new DriverTrackingSystem();
    };
}

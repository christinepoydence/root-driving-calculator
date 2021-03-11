import Trip from './trip.js';

/** Class representing a Driver */
export default class Driver {

    /**
     * Create a Driver
     * @param {String} name - A string containing the name of the driver
     */
    constructor(name){
        this.driverName = name,
        this.trips = [];
        this.totalMilesDriven = 0;
        this.totalTimeSpentDriving = 0;
    };

    /**
     * Adds a trip to a driver if the trip's average speed is greater than 5mph and less than 100mph
     * @param {Trip} trip - A Trip that contains the start time, end time, and miles driven
     */
    addTrip(trip){
        if(!(trip instanceof Trip)){
            throw new Error('trip is not a valid instance of Trip.');
        }
        if(trip.tripSpeed > 5 && trip.tripSpeed < 100){
            this.trips.push(trip);    
            this.totalMilesDriven += trip.milesDriven;
            this.totalTimeSpentDriving += trip.tripTime;
        }
    };

    /**
     * Returns the total number of miles driven by the driver on all qualifying trips
     * @return {Number} the total number of miles driven by the driver on all qualifying trips, rounded to the nearest integer
     */
    calculateTotalMilesDriven(){
        return Math.round(this.totalMilesDriven);
    };

    /**
     * Calculates the average speed of the driver across all trips
     * The mathematical formula for this method is:
     * AverageSpeed = (s1*t1 + s2*t2 + ... + sN*tN)/(t1 + t2 + ... + tN)
     * s = the speed of a given trip in miles per hour
     * t = the travel time of a specific trip in hours
     * N = the number of trips taken by the driver
     * 
     * @return {Number} the the average speed of the driver across all trips, rounded to the nearest integer
     */
    calculateAverageSpeed(){
        if(this.trips.length < 1){
            return 0; //If no trips have been taken, the average speed is 0.
        }
        const sumOfSpeedsByTime = this.trips.map(trip => {
            return trip.tripSpeed*trip.tripTime;
        }).reduce((a, b) => a + b, 0);
        return Math.round(sumOfSpeedsByTime/this.totalTimeSpentDriving);
    };

    /**
     * Displays information about a driver's total miles driven and average speed
     * @return {String} a String in the format "{driverName}: {totalMiles} miles @ {averageSpeed} mph"
     */
    formattedOutput(){
        const milesDrivenString = `${this.driverName}: ${this.totalMilesDriven} miles`;
        const averageSpeedString = this.totalMilesDriven > 0 ? ` @ ${this.calculateAverageSpeed()} mph` : '';
        return milesDrivenString + averageSpeedString;
    };
}
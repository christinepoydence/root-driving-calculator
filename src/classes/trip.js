import { CONSTANT_DATE, MINUTES_IN_HOUR, SECONDS_IN_MINUTE, MILLISECONDS_IN_SECOND } from '../constants/constants.js';

/** Class representing a Trip */
export default class Trip { 
    /**
     * Create a Trip
     * @param {String} startTime - The start time of the trip 
     * @param {String} endTime - The end time of the trip 
     * @param {String} milesDriven - The number of miles driven in the trip
     */
    constructor(startTime, endTime, milesDriven){
        this.startTime = startTime;
        this.endTime = endTime;
        this.milesDriven = Number(milesDriven);
        this.tripTime = this.calculateTripTime();
        this.tripSpeed = this.calculateTripSpeed();
    };

    /**
     * Calculates the time that the trip took in hours by subtracting the start time from the end time.
     * @return {Number} - the total trip time in hours
     */
    calculateTripTime(){
        const parsedStartTime = new Date(CONSTANT_DATE + this.startTime);
        const parsedEndTime = new Date(CONSTANT_DATE + this.endTime);
        const timeDifferenceInMilliseconds = parsedEndTime.getTime() - parsedStartTime.getTime();
        const timeDifferenceInHours = timeDifferenceInMilliseconds / (MINUTES_IN_HOUR*SECONDS_IN_MINUTE*MILLISECONDS_IN_SECOND);
        return timeDifferenceInHours;
    }

    /**
     * Calculates the speed of the trip in miles per hour
     * @return {Number} - the speed of the trip in miles per hour, rounded to the nearest integer
     */
    calculateTripSpeed(){
        const milesPerHour = this.milesDriven/this.tripTime;
        return Math.round(milesPerHour);
    };
}


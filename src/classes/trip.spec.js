import Trip from './trip.js';

test('Trip can be constructed', () => {
    const trip = new Trip('12:00', '14:00', '30');
    expect(trip.startTime).toEqual('12:00');
    expect(trip.endTime).toEqual('14:00');
    expect(trip.milesDriven).toEqual(30);
    expect(trip.tripTime).toEqual(2);
    expect(trip.tripSpeed).toEqual(15);
});

test('trip time is correctly calculated in hours', () => {
    const trip = new Trip('12:00', '14:00', '30');
    expect(trip.calculateTripTime()).toEqual(2);
});

test('trip speed is correctly calculated in miles per hour', () => {
    const trip = new Trip('12:00', '14:00', '30');
    expect(trip.calculateTripSpeed()).toEqual(15);
});
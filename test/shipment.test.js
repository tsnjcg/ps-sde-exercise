const fs = require('fs');
const path = require('path');
const { sum } = require('lodash');
const { faker } = require('@faker-js/faker');
const { assignDrivers } = require('../src/shipment');

const destinations = [];
const drivers = [];

// Run before all tests
beforeAll(() => {
	// Loop from 0-99 to create 100 destinations and drivers
	for (let i = 0; i < 100; i++) {
		// Create fake destination: 123 Main St., Anywhere, NA 00000
		destinations[i] = `${faker.location.streetAddress()}, ${faker.location.city()}, ` +
			`${faker.location.state({abbreviated: true})} ${faker.location.zipCode()}`;
		// Create fake driver: first name, space, last name
		drivers[i] = `${faker.person.firstName()} ${faker.person.lastName()}`;
	}
});

test('all destinations assigned to drivers', () => {
	const { assignments, totalScore } = assignDrivers(destinations, drivers);
	// There should be 100 drivers in the array
	expect(assignments.length).toBe(100);
	// All drivers in the array should have an assigned address
	expect(assignments.filter(a => a.address).length).toBe(100);
	// Add of the scores and ensure that they equal totalScore
	const score = sum(assignments.map(a => a.score));
	expect(totalScore).toBe(score);
});

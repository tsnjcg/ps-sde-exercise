const fs = require('fs');
const { intersection } = require('lodash');

// Assign drivers to destinations
const assignDrivers = (destinations, drivers) => {
	// Validate input
	if (!destinations || !drivers || destinations.length !== drivers.length) {
		throw new Error('Invalid input');
	}

	// Begin by computing the # of vowels and consonants in each name,
	// storing results in a modified drivers object
	const assignments = drivers.map(name => {
		return {
			name,
			vowels: name.match(/[aeiou]/gi).length,
			consonants: name.match(/[bcdfghjklmnpqrstvwxyz]/gi).length
		}
	});

	let totalScore = 0; // Total suitability score
	// Loop through all destinations
	destinations.forEach(destination => {
		// The street address will be the first element in the comma-delimited destination
		const [ streetAddress ] = destination.split(',');
		// Use a regex to extract the street number and name from the address
		const { streetNumber, streetName } = streetAddress.match(/^(?<streetNumber>.*?)\s+(?<streetName>.*)/).groups;
		// Variable to store the top-scoring driver
		let topDriver;
		// Loop through all drivers not previously assigned
		assignments.filter(driver => !driver.address).forEach(driver => {
			// Compute this driver's score: if length of street name is even, add the # of
			// vowels in the driver's name multiplied by 1.5; if odd, add the # of consonants
			let score = (streetName.length % 2 === 0 ? driver.vowels * 1.5 : driver.consonants);
			// Multiply the score by 1.5 if the length of the street name and length of the driver
			// name have common factors other than 1
			if (intersection(findFactors(streetName.length), findFactors(driver.name.length)).length > 0) {
				score *= 1.5;
			}
			// If score exceeds the current leader, replace the current leader with this driver
			if (!topDriver || score > topDriver.score) {
				topDriver = driver;
				topDriver.score = score; // Keep score for future comparisons
			}
		});
		// Add top driver's score to running total
		totalScore += topDriver.score;
		// Store destination in driver record to indicate assignment
		topDriver.address = destination;
	});

	return { assignments, totalScore };
};

// Find the factors of a given number and return them in an array of ints
const findFactors = number => {
	const factors = [];
	// Start loop at 2 because 1 should not be included in factor list
	for (let i = 2; i <= number; i++) {
		// If the number is cleanly divisible by i, it is a factor
		if (number % i === 0) factors.push(i);
	}
	return factors;
};

// Export function
module.exports = { assignDrivers };

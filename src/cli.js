const fs = require('fs');
const { assignDrivers } = require('./shipment');

// Extract file names from argv and read the contents of both files, splitting on newlines
const data = process.argv.slice(2).map(file => fs.readFileSync(file, 'utf8').split(/[\r\n]+/g));
// Send the contents of the two files to assignDrivers()
const { assignments, totalScore } = assignDrivers(...data);

// Output
console.log(`Total suitability score: ${totalScore}`);
console.log('Driver assignments:');
// Print list of driver names and assignments, one on each line
console.log(assignments.map(assignment => `${assignment.name}: ${assignment.address}`).join('\n'));

# ps-sde-exercise

### Prerequisites
Node.js >= 10.0.0

### Installation

From project root, run `npm install`.

No build process is required.

### Run

From a command prompt in the project root, run:

`node src/cli <destinations file> <drivers file>`

or

`npm start <destinations file> <drivers file>`

#### Sample files
Sample destination and driver files with fake data may be found in
`test/data`, so you can run:

`node src/cli ./test/data/destinations.txt ./test/data/drivers.txt`

or just

`npm run fake`

### Assumptions
- Number of destinations and drivers will be the same
- Format of destination will always be `123 Main St., Anywhere, NA 00000`

### Author
Josh Guardino
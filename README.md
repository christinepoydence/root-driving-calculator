# Root Driving Calculator

This is my submission for the coding test portion of the Root interview process.

It solves the Root Coding Problem that is defined here: https://gist.github.com/dan-manges/1e1854d0704cb9132b74

## Prerequisites

In order to run the code and unit tests, you will need:

  - Version 14 or higher of Node.js (This project was developed using v14.16.0.)
  - npm installed (This should be installed automatically as part of the node.js installation.)

  The most recent LTS version of Node.js can be installed from: https://nodejs.org/en/download/

## Initial Set-up

Before running the code or the tests, make sure that you are connected to the internet, navigate to the directory that contains the package.json file, and run the command:

```bash
npm i
```

This will download and install dependencies from the remote _npm_ registry. (The only packages used in this project are jest, for testing, and eslint, for linting.)

## Running the program

To run the code with the default input file that I have created for testing, navigate to the project root and run the command:

```bash
npm start input.txt
```

To run the code with a custom input file, navigate to the project root and run the command:

```bash
npm start YOUR_FILE_NAME.txt
```

VERY IMPORTANT NOTE: In order for this code to run correctly, you MUST put your input file in the root project folder. (At the same level as the package.json file.) Only txt files are supported.

## Unit Tests

To run the tests, navigate to the directory that contains the package.json file, and run the command:

```bash
npm test
```

To see a code coverage report, navigate to the directory that contains the package.json file, and run the command:

```bash
npm run coverage
```

## Thought Process

### Design

I took an object oriented approach to solving this problem. When I started reviewing the problem, it seemed natural to create a tracking system class, a driver class and a trip class. I thought that this approach provided several benefits:
* 

### Testing
Thorough testing and high code coverage is essential to ensuring the quality of a codebase. In order to support that, I followed a test driven development model in completing this assignment. 



Classes

Methods

Error Handling 
-validate commands

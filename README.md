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
* Obeys the Single Responsibility Principle (each class is resposnsible for one part of the program's functionality)
* Allows new functionality to easily be added without modifying the existing functions in the classes.
* Makes the code very human readable and largely self-documenting. 

After creating the classes, I created a service to parse the commands that are read in from the input file. I simply assumed that the parsing servce would receive one command at a time, in the format described by the requirements document. I then was able create a new trip or driver for each valid command that I received and add them to the DriverTrackingSystem.

Finally, I handled the reading from the file. I simply used the basic functionality in readline and fs to do this. For each line that I read, I parsed the command using the service that I designed within a try-catch block. Any errors in a command were printed and then the program continued. After all files were read, all of the drivers in the system were sorted by total miles driven and printed in the requested format.

A note about Dates: I used the js Date() object for this project. Because the requirements specified that the start time and end time would always be in the same calendar day, I did not worry about changing dates or about timezones. If I had needed to implement logic to handle those scenarios, I would have used an npm package such as dayjs or moment because Date() does not have the best support for that functionality. 

### Testing
Thorough testing and high code coverage is essential to ensuring the quality of a codebase. In order to support that, my goal was to ensure 100% code coverage and full testing of all happy paths and error scenarios. I used jest to write the unit tests. Each class and method has full code coverage. 

### Error Handling
One of the areas that I paid the most attention to was clear error handling and logging in the case of an error. As the code processes each command, if the command cannot be processed it is printed to the console with a descriptive error message and then the code resumes processing the remainder of the commands. At the end, the report is printed with the discarded commands excluded. There are also a few scenarios where the entire program will throw an error. 

Scenarios where the entire program will throw:
* A filename is not passed from the command line when the program is started.
* The filename that is passed from the command line arguments is not a txt file.

Scenarios where a command will throw an error but the program will continue:
* Command is something other than Driver or Trip
* Driver command is in an incorrect format
* Trip command is in an incorrect format
* A trip's start time is after it's end time
* The start time or end time of the trip is invalid
* The Driver command is invoked for a driver who has already been added to the system
* The trip command is invoked for a driver that has not yet been added to the system

### Future Improvements
* Currently, if a command cannot be processed, it is discarded. One of the scenarios where this happens is when a trip is recorded for a driver who has not yet been added to the system. It might be nice to include a way to store those trips so that they can be added to the driver once the registration process is complete.
* Currently, there is no way to remove a trip that was added in error or edit a trip that was incorrect. It might be nice to add that functionality. 
* The report is currently printed immediately after the program finishes processing the commands. It might be nice to give the user an option of whether or not to print the report once the file has been processed if there were errors.
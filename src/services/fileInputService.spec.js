import { getFileName } from "./fileInputService";

test('getFileName() returns the name of the file that was passed to the command line', () => {
    process.argv = ['node', 'start', 'main', 'input.txt'];
    expect(getFileName()).toEqual('input.txt');
});

test('getFileName() should throw an error if the input file is not a txt', () => {
    process.argv = ['node', 'start', 'main', 'input.csv'];
    expect(() => { getFileName(); }
    ).toThrow(Error('Only .txt files are supported. File extension must be txt'));
});

test('getFileName() should throw an error if an input file is not passed in the command line arguments', () => {
    process.argv = ['node', 'start', 'main'];
    expect(() => { getFileName(); }
    ).toThrow(Error('A fileName must be specified from the command line to run this code.'));
});
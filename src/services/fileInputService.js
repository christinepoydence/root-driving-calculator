export const getFileName = () => {
    const commandLineArgs = process.argv;
    if(commandLineArgs.length !== 4){
        throw new Error('A fileName must be specified from the command line to run this code.');
    }
    const fileName = commandLineArgs[3];
    if(!fileName.endsWith('.txt')){
        throw new Error('Only .txt files are supported. File extension must be txt');
    }
    return fileName;
};
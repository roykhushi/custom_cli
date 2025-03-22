//creating a cli that lets user specify a file path and nodejs process counts the no of lines inside it
//input : node index.js /users/khushi/cli_command/index.txt
//output : you have 10 words in this file

const fs = require('fs');
const { Command } = require('commander');
const program = new Command();


program.name('counter').description('CLI to do file based tasks').version('0.0.1');

//counting number of lines in a file
program.command('count').description('Counting the number of lines in a file').arguments('<file>', 'file to count the lines').action((file) => {
    fs.readFile(file, 'utf-8', (err,data) => {
        if(err){
            console.log(err);
        }
        else{
            const lines = data.split('\n').length;
            console.log(`There are ${lines} lines in ${file}`);
        }
    });
});

//counting number of words in a file
program.command('count_words').description('Counting the number of words in a file').arguments('<file>', 'file to count the words').action((file) => {
    fs.readFile(file, 'utf-8', (err,data) => {
        if(err){
            console.log(err);
        }
        else{
            let words = 0;
            for(let i=0;i<=data.length;i++){
                if(data[i] == " "){
                    words+=1;
                }
            }
            console.log(`There are ${words+1} words in ${file}`);
        }
    });
});


program.parse();



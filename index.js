//using built in process.argv and fs module
// process.argv[0] → Path to Node.js
// process.argv[1] → Path to the script/filename
// process.argv[2] → First argument
// process.argv[3] → Second argument

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

const command = args[0];
const fileName = args[1];
const content = args.slice(2).join(" "); //content to write in the file for write/append cmds
const targetPath = args[2] || ".";

function searchFile(directory,fileName){//searching in subdirect
    fs.readdir(directory,{withFileTypes:true}, (err,files)=>{
        if(err){
            console.error(`Error reading directory ${directory}:`, err.message);
            return;
        }

        for(const file of files){
            const fullPth = path.join(directory,file.name); 

            if(file.isDirectory()){
                searchFile(fullPth,fileName);
            }
            else if(file.name.toLowerCase() === fileName.toLowerCase()){
                console.log(`File found: ${fullPth}`);
            }
        }
    });
}

switch(command){
    case 'read':
        if(!fileName){
            console.error("File not found!");
            return;
        }
        fs.readFile(fileName,'utf-8',(err,data)=>{
            if(err){
                return console.error(`Error reading the file content ${err.message}`);
            }
            console.log(`Contents of the file are : ${data}`);
        });
        break;
    
    case 'write':
        if(!fileName){
            return console.error(`File not found!`);
        }
        else if(!content){
            return console.error(`Format is : node index.js write <filename> <content>`);
        }

        fs.writeFile(fileName,`\n${content}`, (err)=>{
            if(err){
                console.error(`Some error occurred while writing to the file ${err.message}`);
            }
            console.log(`Content written to file ${fileName} successfully`);
        });
        break;
    case 'append':
        if(!fileName){
        return console.error(`File not found!`);
        }
        fs.appendFile(fileName,`\n${content}`, (err)=> {
            if(err){
                console.error(`Some error occurred while appending content to the file ${err.message}`);
                return;
            }
            console.log(`Content written to the file ${fileName} successfully`);
        });
        break;
    case 'search': 
        // const fileName = args[1];
        if(!fileName){
            return console.error(`File not found!`);
        }
        console.log(`Searching File ${fileName} ...`);
        searchFile(targetPath,fileName);
        break;
    case 'delete':
        if(!fileName){
            return console.error(`File not found!`);
        }
        fs.unlink(fileName, (err) => {
            if(err){
                return console.error(`Some error occurred while deleting the file ${err.message}`);
            }
            console.log(`${fileName} was successfully deleted`);
        });
        break;

    default:
            console.log(`\nUsage:
        node index.js read <filename>     # Read a file
        node index.js write <filename> <content>  # Write to a file
        node index.js append <filename> <content> # Append to a file
        node index.js search <filename> [dir]  # Search for a file (recursively)
        node index.js delete <filename>   # Delete a file`);

}
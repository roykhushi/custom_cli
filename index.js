//using built in process.argv and fs module
// process.argv[0] → Path to Node.js
// process.argv[1] → Path to the script/filename
// process.argv[2] → First argument
// process.argv[3] → Second argument

const fs = require('fs');

const args = process.argv.slice(2);

const command = args[0];
const fileName = args[1];
const content = args.slice(2).join(" "); //content to write in the file for write/append cmds

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

        fs.writeFile(fileName,`${content}`, (err)=>{
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
        fs.appendFile(fileName,`${content}`, (err)=> {
            if(err){
                console.error(`Some error occurred while appending content to the file ${err.message}`);
            }
            console.log(`Content written to the file ${fileName} successfully`);
        });
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
        node index.js delete <filename>   # Delete a file`);
    
    }
    

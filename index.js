//using built in process.argv and fs module
// process.argv[0] → Path to Node.js
// process.argv[1] → Path to the script/filename
// process.argv[2] → First argument
// process.argv[3] → Second argument

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2); //cli args

const command = args[0];
const fileName = args[1]; //or direc path
const content = args.slice(2).join(" "); //content to write in the file for write/append cmds
const targetPath = args[2] || ".";

//file organizer -> divinding files based on their ext eg .jpeg,png into Images etc therefore, scan the direct into folders

if(args.length < 2){
    console.log(`Usage: node index.js organize <directory-path>`);
    process.exit(1);
}

const fileTypes = {
    Images: ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
    Documents: ['.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx'],
    Music: ['.mp3', '.wav', '.flac'],
    Videos: ['.mp4', '.mkv', '.mov', '.avi'],
    Archives: ['.zip', '.rar', '.tar', '.gz'],
    Code: ['.js', '.html', '.css', '.py', '.java', '.cpp', '.ts'],
};

function organizeFiles(direct){
    if(!fs.existsSync(direct)){
        console.log(`Directory does not exit!`);
        return;
    }

    const files = fs.readdirSync(direct);

    files.forEach(file => {
        const filePath = path.join(direct,file);
        const fileExt = path.extname(file).toLowerCase();

        if(fs.statSync(filePath).isFile()){
            let folderName = 'Others'; //default 

            for(const [category,extensions] of Object.entries(fileTypes)){
                if(extensions.includes(fileExt)){
                    folderName = category;
                    break;
                }
            }

            const folderPath = path.join(direct,folderName);
            if(!fs.existsSync(folderPath)){
                fs.mkdirSync(folderPath);
            }

            const newFilePath = path.join(folderPath,file);
            fs.renameSync(filePath,newFilePath);
            console.log(`📂 Moved : ${file} -> ${folderName}/`);
        }
    });

    console.log(`File organization process is completed! 🎉`);
}

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

//restoring the initial structure before restoring
const originalStructure = 'original.json';

// function saveOriginalStructure(directory){ //call this function before organizing stuff
//     let restored = {};

//     fs.readdirSync(directory).forEach(file => {
//         const filePath = path.join(directory,file);

//         if(fs.statSync(filePath).isFile()){
//             restored[file] = filePath; //restoring original path
//         }
//     });

//     fs.writeFileSync(originalStructure,JSON.stringify(restored,null,2));
//     console.log(`Original structure is saved before organizing`);
// }

// function restoreOriginalStructure() {
//     try {
//         const org = JSON.parse(fs.readFileSync(originalStructure, 'utf-8'));

//         Object.entries(org).forEach(([file, originalPath]) => {
//             // Use the directory of the originalStructure file as the base search directory
//             const baseDir = path.dirname(path.resolve(originalStructure));
            
//             // Recursive search function
//             function findFileInDirectory(searchDir) {
//                 const files = fs.readdirSync(searchDir, { withFileTypes: true });
                
//                 for (const fileEntry of files) {
//                     const fullPath = path.join(searchDir, fileEntry.name);
                    
//                     if (fileEntry.isDirectory()) {
//                         // Recursively search subdirectories
//                         findFileInDirectory(fullPath);
//                     } else if (fileEntry.name === file) {
//                         // Move file back to original path
//                         fs.renameSync(fullPath, originalPath);
//                         console.log(`✓ Restored: ${file} -> ${originalPath}`);
//                         return true;
//                     }
//                 }
//                 return false;
//             }

//             // Start recursive search from base directory
//             findFileInDirectory(baseDir);
//         });

//         fs.unlinkSync(originalStructure);
//         console.log('🎉 Restoration complete!');
//     } catch (error) {
//         console.error('Error during restoration:', error.message);
//     }
// }

switch(command){
    case 'organize':
        if(!fileName){
            console.error("File not found!");
            return;
        }
        saveOriginalStructure(fileName);
        organizeFiles(fileName);
        break;
    
    case 'restore': 
        try {
            if (!fs.existsSync(originalStructure)) {
                console.error('No original structure found! Did you organize files first?');
                return;
            }
            restoreOriginalStructure();
        } catch (error) {
            console.error('Error during restoration:', error.message);
        }
        break;

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
        node index.js organize <filename> #Organize files based on their extension
        node index.js read <filename>     # Read a file
        node index.js write <filename> <content>  # Write to a file
        node index.js append <filename> <content> # Append to a file
        node index.js search <filename> [dir]  # Search for a file (recursively)
        node index.js delete <filename>   # Delete a file`);

}
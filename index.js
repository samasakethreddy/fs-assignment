const express = require('express');
const app = express();
const path = require("path");
const fs = require("fs");
const { log } = require('console');
const readline = require("readline");

app.use(express.json())

// *** pipe functionality ***

// // read the contents of a .txt file
// async function readFile(sourceFile, encoding) {
//   return await new Promise((resolve, reject) => {
//     const readStream = fs.createReadStream(sourceFile, { encoding });

//     let data = "";
//     readStream.on("data", (chunk) => {
//       data += chunk;
//     });

//     readStream.on("error", (error) => {
//       reject(error);
//     });

//     readStream.on("end", () => {
//       resolve(data);
//       console.log("File read successfully");
//     });
//   });
// }

// //write the contents to a new file
// async function writeFile(destinationFile, writeContent, encoding) {
//   return await new Promise((resolve, reject) => {
//     const writeStream = fs.createWriteStream(destinationFile, { encoding });

//     writeStream.on("error", (error) => {
//       reject(error);
//     });

//     writeStream.write(writeContent);

//     writeStream.on("finish", () => {
//       resolve();
//       console.log("New file created successfully ");
//     });

//     writeStream.end();
//   });
// }

// // File operations - both read and write
// async function fileOps(
//   encoding,
//   sourceFile,
//   destinationFile,
//   readFunction,
//   writeFunction
// ) {
//   try {
//     const data = await readFunction(sourceFile, encoding);
//     await writeFunction(destinationFile, data);
//     console.log("File operations performed successfully");
//   } catch (e) {
//     console.error("An error occurred during file operations", e);
//   }
// }




// function for reading data from one file and writing it to another file
async function fileOps(encoding, sourceFile, destinationFile){
    try{
        const readStream = await fs.createReadStream(sourceFile, { encoding });
        const writeStream = await fs.createWriteStream(destinationFile, { encoding });
        await readStream.pipe(writeStream);
    }
    catch(err){
        throw new Error(`Error Occured while performing File Operations ${err}`);
    }
}

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
});

rl.question("Enter Your Specific Encoding: ", (encoding) => {
rl.question("Enter the source file path: ", (sourceFile) => {
if(fs.existsSync(sourceFile)){
    rl.question("Enter the destination file path: ", (destinationFile) => {
        // fileOps(encoding, sourceFile, destinationFile, readFile, writeFile)  for changing readfile and writefile functions
        fileOps(encoding, sourceFile, destinationFile)
          .then(() => rl.close());
      });
}
else{
    rl.setPrompt("File Doesnt exist. Try again!!!\n");
    rl.prompt()
    rl.on('line',(sourceFile)=>{
        if(fs.existsSync(sourceFile)){
            rl.question("Enter the destination file path: ", (destinationFile) => {
                fileOps(encoding, sourceFile, destinationFile)
                  .then(() => rl.close());
              });
        }
        else{
            rl.setPrompt("File Doesnt exist. Try again!!!\n");
            rl.prompt()
        }
    })
}
});
});
rl.on('close',()=>{
console.log("File operations performed successfully");
})
// readFile(sourceFile, sourceEncoding);
// writeFile(destinationFile, writeContent, destinationEncoding);
// fileOps(sourceFile, destinationFile, readFile, writeFile);

// Start the server
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
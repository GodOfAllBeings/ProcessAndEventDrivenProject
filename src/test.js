const fs = require('fs')

const path = require('path')

const { exec } = require('child_process')

var list = ""

var listFilePath = './list.txt';

var outputFilePath = Date.now() + 'output.mp4'

const req = {files : ['../assets/catvideo1.mp4', '../assets/catvideo2.mp4'] };
const error = false;



// app.post('/merge',upload.array('files',1000),(req,res) => {
    if(req.files){
        
        req.files.forEach(file => {

            list += `file ${file.filename}`
            list += "\n"
            
        });

        var writeStream = fs.createWriteStream(listFilePath)

        writeStream.write(list)

        writeStream.end()

        exec(`ffmpeg -safe 0 -f concat -i ${listFilePath} -c copy ${outputFilePath}`, (error, stdout, stderr) => {
          
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            else{
                console.log("videos are successfully merged")
                res.download(outputFilePath,(err) => {
                    if(err) throw err

                    req.files.forEach(file => {
                        fs.unlinkSync(file.path)                    
                    });

                    fs.unlinkSync(listFilePath)
                    fs.unlinkSync(outputFilePath)

                })
            }
        })
    }
// })
import express from 'express';
import cors from 'cors';
// import multer from 'multer';
import { createFFmpeg } from '@ffmpeg/ffmpeg';


const app = express();
// const port = 3000;

// const upload = multer({
//     storage: multer.memoryStorage(),
//     limits: { fileSize: 100 * 1024 * 1024 }
// });

// app.post('/thumbnail', upload.single('video'), async (req, res) => {
//     const videoData = req.file.buffer;

//     res.sendStatus(200);
// });

// app.listen(port, () => {
//     console.log(`[info] ffmpeg-api listening at http://localhost:${port}`)
// });


const ffmpegInstance = createFFmpeg({ log: true });
let ffmpegLoadingPromise = ffmpegInstance.load();
// const ffmpeg = await getFFmpeg();
// import { createWorker } from '@ffmpeg/ffmpeg';
// const { createWorker } = ffmpeg;

async function getFFmpeg() {
    if (ffmpegLoadingPromise) {
        await ffmpegLoadingPromise;
        ffmpegLoadingPromise = undefined;
    }

    return ffmpegInstance;
}

// const worker = createWorker({
//     progress: ({ ratio }) => {
//         message.innerHTML = `Complete: ${(ratio * 100.0).toFixed(2)}%`;
//     },
//     logger: (data) => console.log("logger", data)
// });

// const concat = async ( files ) => {
//     message.innerHTML = "Loading ffmpeg-core.js";
//     await worker.load();
    
//     const names = [];
//     for (const f of files) {
//         const { name } = f;
//         await worker.write(name, f);
//         const data = await worker.transcode(name, name + ".mp4");
//         names.push(name + ".mp4");
//         console.log("data", data);
//     }

//     message.innerHTML = "Start concating";
//     await worker.concatDemuxer(names, "output.mp4");
    
//     message.innerHTML = "Complete concating";
//     const { data } = await worker.read("output.mp4");
    
//     console.log("data", data);

//     const video = document.getElementById("output-video");
//     video.src = URL.createObjectURL(
//         new Blob([data.buffer], { type: "video/mp4" })
//     );
// };

// let a = concat(["../assets/catvideo1.mp4", "../assets/catvideo1.mp4"]);
// console.log(a);

app.use(cors());


const fs = require('fs')

const path = require('path')

const { exec } = require('child_process')

var list = ""

var listFilePath = 'public/uploads/' + Date.now() + 'list.txt'

var outputFilePath = Date.now() + 'output.mp4'




app.post('/merge',upload.array('files',1000),(req,res) => {
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
})
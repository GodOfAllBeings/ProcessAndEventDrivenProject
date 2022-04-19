const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
var list = "";
var listFilePath = "./list.txt";
var outputFilePath = Date.now() + "output.mp4";
const req = { files: ["./assets/videos/cat1.mp4", "./assets/videos/dog1.mp4"] };
const express = require("express");
const app = express();


const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send({Hello: "World"});
});



// http://127.0.0.1:3000/
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});




// function mergeErr(files, trend = "") {
//     let ffm = "ffmpeg";
//     let filters = ' -filter_complex "';
//     let filterEnd = "";
//     for (let i = 0; i < files.length; i++) {
//       ffm += ` -i /assets/videos/${files[i]}`;
//       filters += `[${i}]crop=720:720:280:0, scale=640:640, fps=30[${i}v];`;
//       filterEnd += `[${i}v]`;
//     }
//     filterEnd += `concat=n=${
//       files.length
//     }:v=1:a=0[v]" -map "[v]" ${compilationPath(outputFilePath)}`;
  
//     ffm += filters;
//     ffm += filterEnd;
//     console.log(ffm);
//     exec(ffm, (error, stdout, stderr) => {
//       if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//       } else {
//         console.log("videos are successfully merged");
//         res.download(outputFilePath, (err) => {
//           if (err) throw err;
//         });
//       }
//     });
//     return compilationPath(outputFilePath);
//   }

// app.post("/merge", upload.array("files", 1000), (req, res) => {
//   let ffm = "ffmpeg";
//   let filters = ' -filter_complex "';
//   let filterEnd = "";
//   if (req.files) {
//     for (let i = 0; i < req.files.length; i++) {
//       ffm += ` -i public/uploads/${req.files[i].filename}`;
//       filters += `[${i}]crop=720:720:280:0, scale=640:640, fps=30[${i}v];`;
//       filterEnd += `[${i}v]`;
//     }
//     filterEnd += `concat=n=${req.files.length}:v=1:a=0[v]" -map "[v]" ${outputFilePath}`;

//     ffm += filters;
//     ffm += filterEnd;
//     console.log(ffm);
//     exec(
//       // Crops, scales and sets fixed FPS. The String ffm should create something like this example:
//       // `ffmpeg -i assets/ad1.mp4 -i assets/cat1.mp4 -i assets/dog1.mp4 -filter_complex \
//       // "[0]crop=720:720:280:0, scale=640:640, fps=30[0v]; \
//       // [1]crop=720:720:280:0, scale=640:640, fps=30[1v]; \
//       // [2]crop=720:720:280:0, scale=640:640, fps=30[2v]; \
//       // [0v][1v][2v]concat=n=3:v=1:a=0[v]" \
//       // -map "[v]" ${outputFilePath}`,
//       ffm,

//       (error, stdout, stderr) => {
//         if (error) {
//           console.log(`error: ${error.message}`);
//           return;
//         } else {
//           console.log("videos are successfully merged");
//           res.download(outputFilePath, (err) => {
//             if (err) throw err;
//             req.files.forEach((file) => {
//               fs.unlinkSync(file.path);
//             });
//             // fs.unlinkSync(outputFilePath);
//           });
//         }
//       }
//     );
//   }
// });

// if (req.files) {
//   req.files.forEach((file) => {
//     list += `file ${file}`;
//     list += "\n";
//   });

//   var writeStream = fs.createWriteStream(listFilePath);
//   writeStream.write(list);
//   writeStream.end();

//   exec(
//     // `ffmpeg -safe 0 -f concat -i ${listFilePath} -c copy ${outputFilePath}`,

//     // Crops, scales and sets fixed FPS. We can make this more dynamic by writing the command to a .txt file beforehand.
//     `ffmpeg -i assets/ad1.mp4 -i assets/cat1.mp4 -i assets/dog1.mp4 -filter_complex \
//     "[0]crop=720:720:280:0, scale=640:640, fps=30[0v]; \
//     [1]crop=720:720:280:0, scale=640:640, fps=30[1v]; \
//     [2]crop=720:720:280:0, scale=640:640, fps=30[2v]; \
//     [0v][1v][2v]concat=n=3:v=1:a=0[v]" \
//     -map "[v]" ${outputFilePath}`,

//     // `ffmpeg -i assets/ad1.mp4 -i assets/cat1.mp4 -i assets/dog1.mp4 -filter_complex \
//     // "[0]crop=720:720:280:0, scale=640:640, fps=30[0v]; \
//     // [1]crop=720:720:280:0, scale=640:640, fps=30[1v]; \
//     // [2]crop=720:720:280:0, scale=640:640, fps=30[2v]; \
//     // [0v][1v][2v]concat=n=3:v=1:a=0[v]" \
//     // -map "[v]" ${outputFilePath}`,

//     (error, stdout, stderr) => {
//       if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//       } else {
//         console.log("videos are successfully merged");
//         res.download(outputFilePath, (err) => {
//           if (err) throw err;

//           req.files.forEach((file) => {
//             fs.unlinkSync(file.path);
//           });

//           fs.unlinkSync(listFilePath);
//           fs.unlinkSync(outputFilePath);
//         });
//       }
//     }
//   );
// }
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
var list = "";
var listFilePath = "./list.txt";
var outputFilePath = Date.now() + "output.mp4";
const req = { files: ["./assets/videos/cat1.mp4", "./assets/videos/dog1.mp4"] };

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

const getAllVideoNames = () => {
    dir = path.join(__dirname, '../assets/videos');
    var files = fs.readdirSync(dir);
    return files;
}

const getAllVideoWithPartOfName = (substring) => {
    const videos = getAllVideoNames();
    return videos.filter(video => {return video.includes(substring)});
}
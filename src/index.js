const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
var outputFilePath = Date.now() + "output.mp4";
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();

var dir = "public";
var subDirectory = "public/uploads";

// if (!fs.existsSync(dir)) {
//   fs.mkdirSync(dir);
//   fs.mkdirSync(subDirectory);
// }

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const videoFilter = function (req, file, cb) {
//   // Accept videos only
//   if (!file.originalname.match(/\.(mp4)$/)) {
//     req.fileValidationError = "Only video files are allowed!";
//     return cb(new Error("Only video files are allowed!"), false);
//   }
//   cb(null, true);
// };

// var upload = multer({ storage: storage, fileFilter: videoFilter });

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static("public"));

// const PORT = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

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

// http://127.0.0.1:3000/
// app.listen(PORT, () => {
//   console.log(`App is listening on http://localhost:${PORT}`);
// });

//GET ALL VIDEOS
const getAllVideoNames = () => {
  dir = path.join(__dirname, '../assets/videos');
  var files = fs.readdirSync(dir);
  return files;
}

//Get all videos containing a substring, e.g. all videos with "cat" in the name
const getAllVideoWithPartOfName = (substring) => {
  const videos = getAllVideoNames();
  const val = videos.filter(video => video.toLowerCase().includes(substring.toLowerCase()));
  return val;
}

const minimalVideos = 3;
const doesVideosForTrendExists = (trend) => {
  return getAllVideoWithPartOfName(trend).length > minimalVideos;
} 

// The scheduler is set to 20:00 localtime.
const schedule = require('node-schedule');
const Trends = require('./trends_test.js');
const TrendFilter = require('./trendFilter.js');

// Scheduler is * * * * * * --> Second(0-60) Minute(0-60) Hour(0-23) dayOfMonth(1-31) Month(1-12) dayOfWeek(1-7)
var scheduler = schedule.scheduleJob('0 51 14 * * *', function(){
  const countries = ["CA"];//, "DE", "NO", "US", "SE"]; // "GB", "FR", "AU", "BE", "CH"
  console.log(new Date());
  
  // countries.forEach((country, index) => {
  //   if(country !== null && country !== undefined){
  //     Trends.main(country).then(value => {
  //       TrendFilter.saveTrend(value, country);
  //     });
  //   }
  // });
  
});

let bestTrends = TrendFilter.getBestTrends();
bestTrends.forEach(function(value,key) {
  if(doesVideosForTrendExists(key)){
    // concatVideo(key);
    console.log(key);
  }
});
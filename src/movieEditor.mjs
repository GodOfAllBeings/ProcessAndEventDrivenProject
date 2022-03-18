// const express = require('express');
// const cors = require('cors');
// const multer = require('multer');
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { createFFmpeg } from '@ffmpeg/ffmpeg';

const app = express();
const port = 3000;

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 100 * 1024 * 1024 }
});

app.post('/thumbnail', upload.single('video'), async (req, res) => {
    const videoData = req.file.buffer;

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`[info] ffmpeg-api listening at http://localhost:${port}`)
});


const ffmpegInstance = createFFmpeg({ log: true });
let ffmpegLoadingPromise = ffmpegInstance.load();

async function getFFmpeg() {
    if (ffmpegLoadingPromise) {
        await ffmpegLoadingPromise;
        ffmpegLoadingPromise = undefined;
    }

    return ffmpegInstance;
}

const worker = createWorker({
    progress: ({ ratio }) => {
        message.innerHTML = `Complete: ${(ratio * 100.0).toFixed(2)}%`;
    },
    logger: (data) => console.log("logger", data)
});

const concat = async ({ target: { files } }) => {
    message.innerHTML = "Loading ffmpeg-core.js";
    await worker.load();
    
    const names = [];
    for (const f of files) {
        const { name } = f;
        await worker.write(name, f);
        const data = await worker.transcode(name, name + ".mp4");
        names.push(name + ".mp4");
        console.log("data", data);
    }

    message.innerHTML = "Start concating";
    await worker.concatDemuxer(names, "output.mp4");
    
    message.innerHTML = "Complete concating";
    const { data } = await worker.read("output.mp4");
    
    console.log("data", data);

    const video = document.getElementById("output-video");
    video.src = URL.createObjectURL(
        new Blob([data.buffer], { type: "video/mp4" })
    );
};

app.use(cors());
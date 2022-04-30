const { Client, logger } = require("camunda-external-task-client-js");
const Variables = require("camunda-external-task-client-js/lib/Variables");

const index = require('../../src/index.js');
const TrendFilter = require("../../src/trendFilter.js");

const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };
const client = new Client(config);

const topics = {
    GatherContent:"GatherContent",
    SendVideos: "SendVideos",
    VideosReceived:"VideosReceived",
    AutomatedViolationCheck:"AutomatedViolationCheck",
    FilterContent:"FilterContent",
    SendToEditor:"SendToEditor",
    RequestSponsor: "RequestSponsor",
    CombineVideos: "CombineVideos",
    SponsorFound: "SponsorFound",
    AddSponsorSegment:"AddSponsorSegment",
    EditVideo:"EditVideo",
    SendVideoForReview:"SendVideoForReview",
    UploadVideo:"UploadVideo"
}

client.subscribe(topics.GatherContent, async function({ task, taskService }) {
    const processVariables = new Variables();
    const chosenTrend = task.variables.get("videoId");
    if(chosenTrend != null) {
        processVariables.set("chosenTrend", chosenTrend)
    }

    console.log(`Task ${topics.GatherContent} completed`);
    await taskService.complete(task, processVariables);
});

client.subscribe(topics.SendVideos, async function({ task, taskService }) {
    console.log(`Task ${topics.SendVideos} completed`);
    await taskService.complete(task);
});

client.subscribe(topics.VideosReceived, async function({ task, taskService }) {
    console.log(`Task ${topics.VideosReceived} completed`);
    await taskService.complete(task);
});

client.subscribe(topics.AutomatedViolationCheck, async function({ task, taskService }) {
    console.log(`Task ${topics.AutomatedViolationCheck} completed`);
    await taskService.complete(task);
});

client.subscribe(topics.FilterContent, async function({ task, taskService }) {
    console.log(`Task ${topics.FilterContent} completed`);
    await taskService.complete(task);
});

client.subscribe(topics.SendToEditor, async function({ task, taskService }) {
    console.log(`Task ${topics.SendToEditor} completed`);
    await taskService.complete(task);
});

client.subscribe(topics.RequestSponsor, async function({ task, taskService }) {
    console.log(`Task ${topics.RequestSponsor} completed`);
    await taskService.complete(task);
});

client.subscribe(topics.CombineVideos, async function({ task, taskService }) {

    const chosenTrend = task.variables.get("chosenTrend");
    console.log("concat video for trend: " + chosenTrend);
    index.concatVideo(chosenTrend);
    // const videoLink = index.concatVideo("cat");
    // console.log(videoLink);

    // const processVariables = new Variables();
    // processVariables.set("varName", "some_val");

    console.log(`Task ${topics.CombineVideos} completed`);
    await taskService.complete(task);
});

client.subscribe(topics.SponsorFound, async function({ task, taskService }) {
    console.log(`Task ${topics.SponsorFound} completed`);
    await taskService.complete(task);
});

client.subscribe(topics.AddSponsorSegment, async function({ task, taskService }) {
    console.log(`Task ${topics.AddSponsorSegment} completed`);
    await taskService.complete(task);
});

client.subscribe(topics.EditVideo, async function({ task, taskService }) {
    console.log(`Task ${topics.EditVideo} completed`);
    await taskService.complete(task);
});

client.subscribe(topics.SendVideoForReview, async function({ task, taskService }) {
    console.log(`Task ${topics.SendVideoForReview} completed`);
    await taskService.complete(task);
});

client.subscribe(topics.UploadVideo, async function({ task, taskService }) {
    console.log(`Task ${topics.UploadVideo} completed`);
    await taskService.complete(task);
});

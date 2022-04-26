const { Client, logger } = require("camunda-external-task-client-js");
const Variables = require("camunda-external-task-client-js/lib/Variables");

const index = require('./index.js');

const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };
const client = new Client(config);

client.subscribe("CombineVideos", async function({ task, taskService }) {
    // const videoLink = index.concatVideo("cat");
    // console.log(videoLink);

    // const processVariables = new Variables();
    // processVariables.set("varName", "some_val");

    await taskService.complete(task);
});
const { Client, logger } = require("camunda-external-task-client-js");
const Variables = require("camunda-external-task-client-js/lib/Variables");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'creditScoreChecker'
client.subscribe("TrendRequest", async function({ task, taskService }) {

    const processVariables = new Variables();

    const trend = "Cat";

    processVariables.set("trend", trend);
    await taskService.complete(task, processVariables);
});
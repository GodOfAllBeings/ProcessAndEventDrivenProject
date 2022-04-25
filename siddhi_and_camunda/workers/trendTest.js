// Variables
const countryCodes = ["CA", "DE", "NO", "US", "SE", "GB", "FR", "AU", "BE", "CH"];
var countriesSearched = 0;

const { Client, logger } = require("camunda-external-task-client-js");
// const Variables = require("camunda-external-task-client-js");
const Variables = require("camunda-external-task-client-js/lib/Variables");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'RequestCountryCode'. This is the 'Request Country Code' Service Task in the Find Trend diagram.
client.subscribe("RequestCountryCode", async function({ task, taskService }) {
    // Put your business logic
    const countryCode = countryCodes[countriesSearched];
    console.log("** Returning country code: " + countryCode + "**");
  
    const processVariables = new Variables();
    processVariables.set("countryCode", countryCode);
    countriesSearched++;
    processVariables.set("searches", countriesSearched)
    console.log("** Search number: " + countriesSearched + "**");
    await taskService.complete(task, processVariables);
  });

// susbscribe to the topic: 'TrendAPICall'. This is the 'Make API Call' Send Task in the Find Trend diagram.
// It will poll to this topic until this program completes it
client.subscribe("TrendAPICall", async function({ task, taskService }) {
  // Put your business logic
//   const countryCode = task.variables.get("countryCode");
  const countryCode = countryCodes[countriesSearched];
  console.log("** Performing API search on: " + countryCode + "**");

  await taskService.complete(task, processVariables);
});

// susbscribe to the topic: 'SendTrends'. This is the 'Isolate and send top 3' Send Task in the Find Trend diagram.
// Should be the end of the flow
client.subscribe("SendTrends", async function({ task, taskService }) {
    const topTrends = ["Cat", "Bird", "Dog"];
    console.log("** Top results array: " + topTrends + "**");
    
    const processVariables = new Variables();
    processVariables.set("topTrends", topTrends);
  
    await taskService.complete(task, processVariables);
  });
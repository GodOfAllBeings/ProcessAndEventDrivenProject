// Variables
const countryCodes = ["CA", "DE", "NO", "US", "SE", "GB", "FR", "AU", "BE", "CH"];
var countriesSearched = 0;
var axios = require('axios');

const { Client, logger } = require("camunda-external-task-client-js");
const TrendAPI = require("../../src/trendAPI.js");
const TrendFilter = require("../../src/trendFilter.js");
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
  const countryCode = task.variables.get("countryCode");
  console.log("** Performing API search on: " + countryCode + "**");

// Limited to 10 per day
  // let trendResp = await TrendAPI.main(countryCode);
  // console.log("Trend Resp in findTrends.js");
  // console.log(trendResp)
  // TrendFilter.saveTrend(trendResp, countryCode);

  await taskService.complete(task);
});

var trend1 = "cat";
var trend2 = "dog";
var trend3 = "bird";

client.subscribe("SelectTopTrends", async function({ task, taskService }) {
    const processVariables = new Variables();
    console.log("** Selecting top trends from list: **");

    const bestTrends = TrendFilter.getBestTrends();
    trend1 = [...bestTrends][0];
    trend2 = [...bestTrends][1];
    trend3 = [...bestTrends][2];

    console.log(bestTrends);
    console.log("Top 3:");
    console.log(trend1);
    console.log(trend2);
    console.log(trend3);
    await taskService.complete(task, processVariables);
});

// susbscribe to the topic: 'SendTrends'. This is the 'Isolate and send top 3' Send Task in the Find Trend diagram.
// Should be the end of the flow
client.subscribe("SendTrends", async function({ task, taskService }) {
    // const trend1 = "cat";
    // const trend2 = "dog";
    // const trend3 = "bird";
    const processVariables = new Variables();
    processVariables.set("trend1", trend1);
    processVariables.set("trend2", trend2);
    processVariables.set("trend3", trend3);

    console.log("Process variables in SendTrends:");
    console.log(processVariables);

    await taskService.complete(task, processVariables);
  });


client.subscribe("AlertUser", async function({ task, taskService }) {
    //   const countryCode = task.variables.get("countryCode");
      console.log("** Trend Search Failed, Notifying Manual Man **");
      const processVariables = new Variables();
      await taskService.complete(task, processVariables);
});

client.subscribe("ViralTrend", async function({ task, taskService }) {
    //   const countryCode = task.variables.get("countryCode");
      const processVariables = new Variables();
      const trendingVideoName = "Cats"
      console.log("** Viral video: " + trendingVideoName + "**");
      processVariables.set("videoName", trendingVideoName);
      await taskService.complete(task, processVariables);
});

/* 
**
**    WORKERS FOR MERCH
**
*/ 

// WORKER FOR CHECKING FOR MerchInStock
client.subscribe("MerchInStock", async function({ task, taskService }) {
  const processVariables = new Variables();
  let merchAvailability;
  if(task.variables.get("videoId") == "lolCatz") {
    merchAvailability = "true";
  } else {
    merchAvailability = "false";
  }
  console.log("** Merch is in stock: " + merchAvailability + "**");
  processVariables.set("inStock", merchAvailability);
  await taskService.complete(task, processVariables);
});

// Receives and prints a confirmation of a successful process run
client.subscribe("CompletedProcess", async function({ task, taskService }) {
  console.log("** A process completed: **");
  // console.log(task);
  // console.log(taskService);
  await taskService.complete(task, new Variables());
});

client.subscribe("PopularTopic", async function({ task, taskService }) {
  //   const countryCode = task.variables.get("countryCode");
    const processVariables = new Variables();
    const trendingVideoName = "lolCatz"
    console.log("** Viral video: " + trendingVideoName + "**");
    processVariables.set("topicName", trendingVideoName);
    await taskService.complete(task, processVariables);
});

// Delete when done with CreateContent
client.subscribe("ChooseTrendTopic", async function({ task, taskService }) {
    const processVariables = new Variables();
  
    console.log("** Choose Trend Topic: **");
    
    await taskService.complete(task, processVariables);
});
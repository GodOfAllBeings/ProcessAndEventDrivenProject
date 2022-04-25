const { Client, logger } = require("camunda-external-task-client-js");
// const Variables = require("camunda-external-task-client-js");
const Variables = require("camunda-external-task-client-js/lib/Variables");

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// create a Client instance with custom configuration
const client = new Client(config);

// susbscribe to the topic: 'creditScoreChecker'
client.subscribe("TrendAPICall", async function({ task, taskService }) {
  // Put your business logic
  const countryCode = task.variables.get("countryCode");
  console.log("** Performing API search on: " + countryCode + "**");

  const austriaResponse = "Sorry Laff can't help. BTW, Prussia wants a quick word with you...";
  const processVariables = new Variables();
  processVariables.set("austriaResponse", austriaResponse);


//   // Second version
//   if(countryCode.includes("Austria")) {
//     // complete the task
//     await taskService.complete(task, processVariables);
//   } else {
//     // throw a BPMN error
//     await taskService.handleBpmnError(task, "REFUSE_HELP", "Sorry! We're super busy, you are")
//   }

  // First version of complete the task
  await taskService.complete(task, processVariables);

  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "messageName": "TrendsReceived",
  "processVariables": {
    "trends": {
      "value": "Waffles Are Dope",
      "type": "String"
    },
    "searches": {
      "value": 10,
      "type": "Integer"
    }
  },
  "resultEnabled": true,
  "variablesInResultEnabled": true
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("localhost:8080/engine-rest/message", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
});

// client.subscribe("SendTrend", async function({ task, taskService }) {
//     // Put your business logic
//     const bookTitle = "Sup ya'll, it's ya boi Asmongold";
//     console.log("** Reminder to read: " + bookTitle + "**");
  
//     const austriaResponse = "Sorry Laff can't help. BTW, Prussia wants a quick word with you...";
//     const processVariables = new Variables();
//     processVariables.set("austriaResponse", austriaResponse);
  
  
//   //   // Second version
//   //   if(bookTitle.includes("Austria")) {
//   //     // complete the task
//   //     await taskService.complete(task, processVariables);
//   //   } else {
//   //     // throw a BPMN error
//   //     await taskService.handleBpmnError(task, "REFUSE_HELP", "Sorry! We're super busy, you are")
//   //   }
  
//     // First version of complete the task
//     await taskService.complete(task, processVariables);
//   });
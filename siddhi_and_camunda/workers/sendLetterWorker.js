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
client.subscribe("SendLetter", async function({ task, taskService }) {
  // Put your business logic
  const bookTitle = task.variables.get("book");
  console.log("** Reminder to read: " + bookTitle + "**");

  const austriaResponse = "Sorry Laff can't help. BTW, Prussia wants a quick word with you...";
  const processVariables = new Variables();
  processVariables.set("austriaResponse", austriaResponse);


  // Second version
  if(bookTitle.includes("Austria")) {
    // complete the task
    await taskService.complete(task, processVariables);
  } else {
    // throw a BPMN error
    await taskService.handleBpmnError(task, "REFUSE_HELP", "Sorry! We're super busy, you are")
  }

  // First version of complete the task
  // await taskService.complete(task, processVariables);
});
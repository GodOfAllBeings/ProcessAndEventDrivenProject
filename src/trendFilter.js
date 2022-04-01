// file system module to perform file operations
const fs = require('fs');
const path = require("path");
const trendFilePath = "./assets/trends"
const dir = path.join(__dirname,`.${trendFilePath}`);
 
// json data
var jsonData = '{"googleTrendingSearchList":[{"trendingSearchToken":"0323024f-5719-4c1e-b9f4-f719c03e9df2:CA-20220325","trendingSearchTitle":{"rankId":1,"searchTitle":"Taylor Hawkins"}},{"trendingSearchToken":"85fc5266-d8dc-4121-9a85-7b72d5697287:CA-20220325","trendingSearchTitle":{"rankId":2,"searchTitle":"Bridgerton"}},{"trendingSearchToken":"8c8c8f38-3531-453a-92e2-b68ab655112a:CA-20220325","trendingSearchTitle":{"rankId":3,"searchTitle":"Raptors"}},{"trendingSearchToken":"3cb862cf-4bff-4d02-8da5-960f4df39a01:CA-20220325","trendingSearchTitle":{"rankId":4,"searchTitle":"Triple H"}},{"trendingSearchToken":"9efa2bfc-9677-4346-856c-ae82f5e242c0:CA-20220325","trendingSearchTitle":{"rankId":5,"searchTitle":"Saudi Arabia Grand Prix"}},{"trendingSearchToken":"df93c3ce-78ad-4912-b379-c79879ecdb5a:CA-20220325","trendingSearchTitle":{"rankId":6,"searchTitle":"Venus Williams"}},{"trendingSearchToken":"367b152c-714f-4768-943f-c3ba4acdb82d:CA-20220325","trendingSearchTitle":{"rankId":7,"searchTitle":"CODA"}},{"trendingSearchToken":"af34a89a-1ab0-4189-9b05-bcd1a1721484:CA-20220325","trendingSearchTitle":{"rankId":8,"searchTitle":"Bridgerton season 2 cast"}},{"trendingSearchToken":"1d642f53-36b0-4972-b6aa-788e647bd6c8:CA-20220325","trendingSearchTitle":{"rankId":9,"searchTitle":"Oscar nominations 2022"}},{"trendingSearchToken":"e557e289-9138-43dc-a9e4-e072324aed6d:CA-20220325","trendingSearchTitle":{"rankId":10,"searchTitle":"Doja Cat"}},{"trendingSearchToken":"b888f55e-27aa-47f4-b74d-0e5e30c50059:CA-20220325","trendingSearchTitle":{"rankId":11,"searchTitle":"Raptors game"}},{"trendingSearchToken":"52b9374f-9d64-4e6e-8b62-bc6c3b7db9a6:CA-20220325","trendingSearchTitle":{"rankId":12,"searchTitle":"Egypt vs Senegal"}},{"trendingSearchToken":"c05494e7-d9cd-49b5-a799-6ab3bfc5628d:CA-20220325","trendingSearchTitle":{"rankId":13,"searchTitle":"King Richard"}},{"trendingSearchToken":"657d4eb4-9283-41f9-abfb-23e0cb0c8fc4:CA-20220325","trendingSearchTitle":{"rankId":14,"searchTitle":"Hayden Panettiere"}},{"trendingSearchToken":"e3c31e4c-4bdc-433a-a5ea-1b32887d9eff:CA-20220325","trendingSearchTitle":{"rankId":15,"searchTitle":"St. Peter\'s"}}],"userRequestId":"requestId","friendlyFormattedDate":"Friday, 25 March 2022","tokenExpirationTime":"Tuesday, 29 March 2022 18:51:55","tokenExpirationTimeInUtc":"Tuesday, 29 March 2022 07:51:55","errorMessage":"N/A"}';
// saveTrend(jsonData, "Canada");

function saveTrend(trendRes, country) {
    let fileName = `trend-${country}-${(new Date().toJSON().slice(0,10))}.json`

    // parse json
    // let trendJson = JSON.parse(trendRes);
    // console.log(trendJson);
    
    // stringify JSON Object. Argument 3 makes json pretty
    let trendString = JSON.stringify(trendRes, null, 2);
    console.log(trendString);

    // fs.writeFile(`${trendFilePath}/trend-${country}-${(new Date().toJSON().slice(0,10))}.json`, trendString, 'utf8', function (err) {
    fs.writeFile(`${trendFilePath}/${fileName}`, trendString, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
        console.log("JSON file has been saved.");
    });
};

// removeOutdatedFiles();
function removeOutdatedFiles() {
    let oldDate = new Date(new Date().setDate(new Date().getDate()-6)).toJSON().slice(0,10);
    console.log("Removing files before date: " + oldDate);
    let dates = [];
    let trendFileNames = fs.readdirSync(dir);
    trendFileNames.forEach(fileName => {
        let fileDate = fileName.slice(fileName.length - 15, fileName.length - 5);
        if(isDateTooOld(fileDate, oldDate)) {
            try {
                fs.unlinkSync(`${trendFilePath}/${fileName}`);
                console.log(`Removed file ${trendFilePath}/${fileName} because ${fileDate} is before ${oldDate}`);
            } catch (err) {
                console.error(err);
            }
        }
        
    })

}

function getWeekDates() {
    let dates = [];
    for (let i = 0; i < 7; i++) {
        dates.push(new Date(new Date().setDate(new Date().getDate()-i)).toJSON().slice(0,10));
    }
    dates.forEach(date => {
        console.log(date);
    });
    return dates;
}

function isDateTooOld(fileDate, oldDate) {
    fileDateFormat = new Date(fileDate.substring(0,4), fileDate.substring(5,7), fileDate.substring(8,10))
    oldDateFormat = new Date(oldDate.substring(0,4), oldDate.substring(5,7), oldDate.substring(8,10))
    return new Date(fileDateFormat.toDateString()) < new Date(oldDateFormat.toDateString());
}

getBestTrends();
function getBestTrends() {
    let trendFileNames = fs.readdirSync(dir);
    var jsonTrends = [];
    trendFileNames.forEach(name => {
        jsonTrends.push(fs.readFileSync(`${dir}/${name}`, 'utf8'));
    });
    return jsonTrends;
}

module.exports={saveTrend};
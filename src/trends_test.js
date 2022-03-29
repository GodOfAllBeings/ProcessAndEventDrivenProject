const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");

const trendsTest5 = require('./trends_test_5_canada.json');

const axios = require("axios").default;

main();
// Core Process Portfolio - Importance vs health

async function main() {

  //fetch("trends_test_5_canada.json").then(x => console.log(x));

  let f = fs.read(path.join(__dirname, "./trends_test_5_canada.json"));


  let catFact = await getData();
  console.log("res:");
  console.log(JSON.stringify(catFact));


  let googleTrend = await getTrendsData();
  let parsedTrends = googleTrend.googleTrendingSearchList.map(search => search.trendingSearchTitle);
//   googleTrend.googleTrendingSearchList.map(search => search.trendingSearchTitle)
//      (15) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
//    0:{rankId: 1, searchTitle: 'Taylor Hawkins'}
//      1:{rankId: 2, searchTitle: 'Bridgerton'}
//      2:{rankId: 3, searchTitle: 'Raptors'}
//      3:{rankId: 4, searchTitle: 'Triple H'}
//      4:{rankId: 5, searchTitle: 'Saudi Arabia Grand Prix'}
//      5:{rankId: 6, searchTitle: 'Venus Williams'}
//      6:{rankId: 7, searchTitle: 'CODA'}
//      7:{rankId: 8, searchTitle: 'Bridgerton season 2 cast'}
//      8:{rankId: 9, searchTitle: 'Oscar nominations 2022'}
//      9:{rankId: 10, searchTitle: 'Doja Cat'}
//      10:{rankId: 11, searchTitle: 'Raptors game'}
//      11:{rankId: 12, searchTitle: 'Egypt vs Senegal'}
//      12:{rankId: 13, searchTitle: 'King Richard'}
//      13:{rankId: 14, searchTitle: 'Hayden Panettiere'}
//      14:{rankId: 15, searchTitle: 'St. Peter's'}


  //localStorage.setItem('api_response', JSON.stringify(result));
  // console.log(localStorage.getItem('api_response'));
  console.log("Trends res:");
  console.log(JSON.stringify(googleTrend));

  console.log("Trends:");
  googleTrend.googleTrendingSearchList.map(trend => {
    return `${trend.trendingSearchTitle.rankId} : ${trend.trendingSearchTitle.searchTitle}`
  })

}

async function getData() {
  let result;
  await axios({
    method: 'GET',
    url: 'https://catfact.ninja/fact'
  }).then(resp => result = resp.data);
  return result;
}

async function getTrendsData() {
  let requestId = 'requestId';
  let countryCode = 'CA';
  let resultCount = '15'; // Max 20
  let date = '20220325';
  let baseUrl = 'https://google-trends.p.rapidapi.com/api/v1/'
  let path = `DailyTrendingSearches/${requestId}/${countryCode}/${resultCount}/${date}`
  let countryCodes = 'CountryCodeDetails'

  let options = {
    method: 'GET',
    url: `${baseUrl}${path}`,
    headers: {
      'x-rapidapi-host': 'google-trends.p.rapidapi.com',
      'x-rapidapi-key': 'b8fff8da4bmsh768052460ff46fbp12e000jsn73a2c881a5e1'
    }
  };
  
  let result;
  
  await axios(options).then(response => result = response.data).catch( error => result = error);

  return result;
}
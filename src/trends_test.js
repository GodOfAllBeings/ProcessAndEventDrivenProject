const res = require("express/lib/response");
const fs = require("fs");
const path = require("path");
const axios = require("axios").default;

main();

async function main(countryCode) {
  let cc = countryCode ?? "ca";

  let validCC = validCountryCode(cc);

  if(validCC != true){
    return;
  }
   
  let googleTrend = await getTrendsData(cc);
  
  // Parse trends data to form:
  // {rankId: int, searchTitle: 'string'}[]
  //      (15) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  //      0:{rankId: 1, searchTitle: 'Taylor Hawkins'}
  // let parsedTrends = googleTrend.googleTrendingSearchList.map(search => search.trendingSearchTitle);

  // console.log("Trends:");
  // googleTrend.googleTrendingSearchList.map(trend => {
  //   return `${trend.trendingSearchTitle.rankId} : ${trend.trendingSearchTitle.searchTitle}`
  // })

  return googleTrend;
}


function validCountryCode(code) {
  let countries = fs.readFileSync(path.join(__dirname, "../country_codes.json"), 'utf8');
  return JSON.parse(countries).countryList.map(country => country.countryCode.toLowerCase()).indexOf(code.toLowerCase()) > -1;
}

function yyyymmdd() {
  var now = new Date();
  var y = now.getFullYear();
  var m = now.getMonth() + 1;
  var d = now.getDate();
  var mm = m < 10 ? '0' + m : m;
  var dd = d < 10 ? '0' + d : d;
  return '' + y + mm + dd;
}


async function getTrendsData(requestedCountry) {

  let requestId = 'requestId';
  let countryCode = requestedCountry.toUpperCase();
  let resultCount = '15'; // Max 20
  let date = yyyymmdd();
  let baseUrl = 'https://google-trends.p.rapidapi.com/api/v1/'
  let trendingsEndpoint = `DailyTrendingSearches/${requestId}/${countryCode}/${resultCount}/${date}`
  let countryCodesEndpoint = 'CountryCodeDetails'

  let options = {
    method: 'GET',
    url: `${baseUrl}${trendingsEndpoint}`,
    headers: {
      'x-rapidapi-host': 'google-trends.p.rapidapi.com',
      'x-rapidapi-key': '414e48f57cmsh577ffa0d7dd234bp1b230bjsn1cc2eeda3539'
    }
  };
  
  let result;
  
  await axios(options).then(response => result = response.data).catch( error => result = error);

  return result;
}
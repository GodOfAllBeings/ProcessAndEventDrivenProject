const res = require("express/lib/response");

const axios = require("axios").default;

main();

async function main() {
  
  let catFact = await getData();
  console.log("res:");
  console.log(JSON.stringify(catFact));


  let googleTrend = await getTrendsData();
  
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
  let countryCode = 'US';
  let resultCount = '15'; // Max 20
  let date = '20220321';
  
  let options = {
    method: 'GET',
    url: `https://google-trends.p.rapidapi.com/api/v1/DailyTrendingSearches/${requestId}/${countryCode}/${resultCount}/${date}`,
    headers: {
      'x-rapidapi-host': 'google-trends.p.rapidapi.com',
      'x-rapidapi-key': '05003a938amsh173fba0f58e99fep18f1bfjsn70e550afa867'
    }
  };
  
  let result;
  
  await axios(options).then(response => result = response.data).catch( error => result = error);

  return result;
}
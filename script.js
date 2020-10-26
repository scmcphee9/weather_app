var latitude = 33.441792;
var longitude = -94.037689;
// var weatherAPI =
//   "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//   latitude +
//   "&lon=" +
//   longitude +
//   "&exclude=minutely,hourly,alerts&appid=d7ca7edce9a0915ba4502c508b220e07";

var weatherAPI =
  "https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=minutely,hourly,alerts&appid=d7ca7edce9a0915ba4502c508b220e07";

fetch(weatherAPI)
  .then(function (response) {
    return response;
  })
  .then(function (data) {
    console.log(data);
  });

console.log("test");

$("#searchBtn").on("click", function (event) {
  event.preventDefault();

  var city = $("#cityInput").val();

  console.log(city);

  var currentWeather =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=d7ca7edce9a0915ba4502c508b220e07&units=imperial";

  var fiveDay =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=d7ca7edce9a0915ba4502c508b220e07&units=imperial";

  fetch(currentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("current -------------------");
      console.log(data);

      var lat = data.coord.lat;
      var lon = data.coord.lon;

      console.log(lat);
      console.log(lon);

      var uvIndex =
        "http://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=d7ca7edce9a0915ba4502c508b220e07";

      fetch(uvIndex)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log("UV Index ------------------");
          console.log(data);
        });
    });

  fetch(fiveDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("five Day -----------------");
      console.log(data);
    });
});

// var locationAPI =
//   "https://maps.googleapis.com/maps/api/geocode/json?address=" + city + "&key";

//   http://open.mapquestapi.com/geocoding/v1/address

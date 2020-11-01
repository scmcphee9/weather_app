var key = 0;
var recentSearch =
  JSON.parse(window.localStorage.getItem("recentSearch")) || [];
var ulEl = $("#recentSearch");
var cardEl = $("#currentWeather");

$("#searchBtn").on("click", function (event) {
  event.preventDefault();

  var city = $("#cityInput").val();

  console.log(city);

  if (city === "") {
    return;
  }

  // local storage

  recentSearch.unshift(city);
  function localStorageSave() {
    localStorage.setItem(key, JSON.stringify(recentSearch));
  }
  localStorageSave();
  //this does not appear to be pushing to recent search array

  console.log(recentSearch);

  function makeHistory(city) {
    console.log(city);
    var liEl = $("<li>").addClass("cityList").text(city);
    $("#recentSearch").append(liEl);
  }

  for (var i = 0; i < recentSearch.length; i++) {
    var savedSearch = recentSearch[i];
    console.log(savedSearch);

    makeHistory(savedSearch);
  }

  // variables for API links
  var currentWeather =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=d7ca7edce9a0915ba4502c508b220e07&units=imperial";

  var fiveDay =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=d7ca7edce9a0915ba4502c508b220e07&units=imperial";

  // fetch requests on weather APIs

  fetch(currentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("current -------------------");
      //console.log(data);

      // defines lat and lon coordinates of searched city
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      //var currentDate =
      var currentCity = data.name + "(date)";
      var currentTemp = data.main.temp + " °F";
      var currentHumid = data.main.humidity + "%";
      var currentWind = data.wind.speed + " mph";
      console.log(currentCity);
      console.log(currentTemp);
      console.log(currentHumid);
      console.log(currentWind);

      var cityTitle = $("<h4>").text(currentCity);
      $("#currentWeather").append(cityTitle);

      // console.log(lat);
      // console.log(lon);

      // defines UV index api url
      var uvIndex =
        "http://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=d7ca7edce9a0915ba4502c508b220e07";

      // fetch request for uv index
      fetch(uvIndex)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log("UV Index ------------------");
          // console.log(data);
          var currentUVIndex = data.value;
          console.log(currentUVIndex);
        });
    });

  fetch(fiveDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("five Day -----------------");
      console.log(data);

      // for loop to pull each object for future days
    });
});

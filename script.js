var key = 0;
var recentSearch =
  JSON.parse(window.localStorage.getItem("recentSearch")) || [];
var ulEl = $("#recentSearch");
var cardEl = $("#currentWeather");

// onclick event to trigger all of the following API calls,

$("#searchBtn").on("click", function (event) {
  event.preventDefault();

  // input for city to search
  var city = $("#cityInput").val();

  if (city === "") {
    return;
  }

  // local storage
  // this will put the new search item to the front of the array it is creating
  recentSearch.unshift(city);

  function localStorageSave() {
    localStorage.setItem(key, JSON.stringify(recentSearch));
  }
  localStorageSave();

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

  // fetch request on current weather APIs

  fetch(currentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("current -------------------");
      console.log(data);

      // defines lat and lon coordinates of searched city for inner fetch call for uv index
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      // console.log(lat);
      // console.log(lon);

      // defines all the information that we need to display for the current weather
      var todaysDate = new Date();
      var todaysDateString = todaysDate.toLocaleDateString();
      var currentCity = data.name;
      var currentTemp = data.main.temp + " °F";
      var currentHumid = data.main.humidity + "%";
      var currentWind = data.wind.speed + " mph";
      var currentWeather = data.weather[0].icon;
      var currentWeatherIcon =
        "<img src='http://openweathermap.org/img/wn/" +
        currentWeather +
        "@2x.png' width='60'></img>";
      // console.log(currentCity);
      // console.log(currentTemp);
      // console.log(currentHumid);
      // console.log(currentWind);

      // appends all of the variable information into the html with id currentWeather

      var cityTitle = $("<h4>").text(
        currentCity + " (" + todaysDateString + ")"
      );
      $("#currentWeather").append(cityTitle);

      $("#currentWeather").append(currentWeatherIcon);

      var cityTemp = $("<p>").text("Temperature: " + currentTemp);
      $("#currentWeather").append(cityTemp);

      var cityHumid = $("<p>").text("Humidity: " + currentHumid);
      $("#currentWeather").append(cityHumid);

      var cityWind = $("<p>").text("Wind Speed: " + currentWind);
      $("#currentWeather").append(cityWind);

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
          currentUVIndex = currentUVIndex;
          console.log(currentUVIndex);

          // appends uv Index
          var cityUVIndex = $("<p>").text("UV Index: " + currentUVIndex);
          $("#currentWeather").append(cityUVIndex);
        });

      var fiveDay =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude=current,minutely,hourly,alerts&units=imperial&appid=d7ca7edce9a0915ba4502c508b220e07";
      // fetches 5day forecast api
      fetch(fiveDay)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log("five Day -----------------");
          console.log(data);

          var day = [1, 2, 3, 4, 5];

          // for loop to pull the first 5 days from the array of information in the api

          for (var i = 0; i < 5; i++) {
            function toLocalDate(unixTime) {
              var unixDate = new Date(unixTime * 1000);
              return unixDate.toLocaleDateString("en-US");
            }

            var dayTemp = data.daily[i].temp.day + " °F";
            var dayHumid = data.daily[i].humidity + "%";
            var dayDate = data.daily[i].dt;
            var dayIcon = data.daily[i].weather[0].icon;
            var dayWeatherIcon =
              "<img src='http://openweathermap.org/img/wn/" +
              dayIcon +
              "@2x.png' width='60'></img>";

            var daysDates = $("<p>").text(toLocalDate(dayDate));
            $(`#day_${day[i]}`).append(daysDates);

            $(`#day_${day[i]}`).append(dayWeatherIcon);

            var daysTemps = $("<p>").text("Temperature: " + dayTemp);
            $(`#day_${day[i]}`).append(daysTemps);

            var daysHumids = $("<p>").text("Humidity: " + dayHumid);
            $(`#day_${day[i]}`).append(daysHumids);
            // for loop to pull each object for future days
          }
        });
    });
});

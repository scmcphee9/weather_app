$("#searchBtn").on("click", function (event) {
  event.preventDefault();

  var city = $("#cityInput").val();

  console.log(city);

  if (city === "") {
    return;
  }

  // local storage

  var recentSearch = [];
  recentSearch.push(city);
  localStorage.setItem("cityRequest", JSON.stringify(recentSearch));
  console.log(recentSearch);

  for (var i = 0; i < recentSearch.length; i++) {
    var savedSearch = localStorage.getItem(recentSearch[i]);
  }
  $("#recentSearch").append(savedSearch);

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

  // fetch(currentWeather)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     console.log("current -------------------");
  //     console.log(data);

  //     // defines lat and lon coordinates of searched city
  //     var lat = data.coord.lat;
  //     var lon = data.coord.lon;

  //     console.log(lat);
  //     console.log(lon);

  //     // defines UV index api url
  //     var uvIndex =
  //       "http://api.openweathermap.org/data/2.5/uvi?lat=" +
  //       lat +
  //       "&lon=" +
  //       lon +
  //       "&appid=d7ca7edce9a0915ba4502c508b220e07";

  //     // fetch request for uv index
  //     fetch(uvIndex)
  //       .then(function (response) {
  //         return response.json();
  //       })
  //       .then(function (data) {
  //         console.log("UV Index ------------------");
  //         console.log(data);
  //       });
  //   });

  // fetch(fiveDay)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     console.log("five Day -----------------");
  //     console.log(data);
  //   });
});

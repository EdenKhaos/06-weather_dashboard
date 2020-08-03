// contains list (empty until given event)
var searchHistory = [];
// returns local storage search history
function getItems() {
    var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedCities !== null) {
        searchHistory = storedCities;
    };
     // lists up to 8 locations
    for (i = 0; i < searchHistory.length; i++) {
        if (i == 8) {
            break;
          }
        //  creates links/buttons https://getbootstrap.com/docs/4./components/list-group/
        cityListButton = $("<a>").attr({
            class: "list-group-item list-group-item-action",
            href: "#"
        });
        // appends history as a button below the search field
        cityListButton.text(searchHistory[i]);
        $(".list-group").append(cityListButton);
    }
};
var city;
var mainCard = $(".card-body");
// prompt getItems
getItems();
// main card
function getData() { // my api code
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=49fb27317373bb54f7d9243387af6df3" // starts call for current conditions
    mainCard.empty();
    $("#weeklyForecast").empty();
    // requests
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // using moment to call the date
        var date = moment().format(" MM/DD/YYYY");
        // takes the icon code from the response and assigns it to iconCode
        var iconCode = response.weather[0].icon;
        // builds the main card icon url
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        // takes the name added from the search and the date/format from moment and creates a single var
        var name = $("<h3>").html(city + date);
        // displays name in main card
        mainCard.prepend(name);
        // displays icon on main card
        mainCard.append($("<img>").attr("src", iconURL));
        // converts K and removes decimals using Math.round
        var temp = Math.round((response.main.temp - 273.15) * 1.80 + 32);
        mainCard.append($("<p>").html("Temperature: " + temp + " &#8457")); //appends fahrenheit degrees using short key code
        var humidity = response.main.humidity;
        mainCard.append($("<p>").html("Humidity: " + humidity)); // appends humidity
        var windSpeed = response.wind.speed;
        mainCard.append($("<p>").html("Wind Speed: " + windSpeed)); // appends windspeed
        // takes from the response and creates a var used in the next request for UV index
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        // separate request for UV index, requires lat/long
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=49fb27317373bb54f7d9243387af6df3&lat=" + lat + "&lon=" + lon, // my api code
            method: "GET"
        // displays UV in main card and is color coded based off of intensity
        }).then(function (response) {
            mainCard.append($("<p>").html("UV Index: <span>" + response.value + "</span>"));
            // 
            if (response.value <= 2) {
                $("span").attr("class", "btn btn-outline-success");
            };
            if (response.value > 2 && response.value <= 5) {
                $("span").attr("class", "btn btn-outline-warning");
            };
            if (response.value > 5) {
                $("span").attr("class", "btn btn-outline-danger");
            };
        })
        // another call for the 5-day (forecast)
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=49fb27317373bb54f7d9243387af6df3", // my api code
            method: "GET"
        // displays 5 separate columns from the forecast response for 5 days
        }).then(function (response) {
            for (i = 0; i < 5; i++) { // start for loop
                // creates the columns
                var newCard = $("<div>").attr("class", "col fiveDay bg-primary text-white rounded-lg p-2");
                $("#weeklyForecast").append(newCard);
                // uses moment for the date
                var myDate = new Date(response.list[i * 8].dt * 1000);
                // displays date
                newCard.append($("<h4>").html(myDate.toLocaleDateString()));
                // brings back the icon url suffix
                var iconCode = response.list[i * 8].weather[0].icon;
                // builds the icon URL
                var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                // displays the icon
                newCard.append($("<img>").attr("src", iconURL));
                // converts K and removes decimals using Math.round
                var temp = Math.round((response.list[i * 8].main.temp - 273.15) * 1.80 + 32);
                // displays temp
                newCard.append($("<p>").html("Temp: " + temp + " &#8457")); //appends fahrenheit degrees using short key code
                // creates a var for humidity from the response
                var humidity = response.list[i * 8].main.humidity;
                // displays humidity
                newCard.append($("<p>").html("Humidity: " + humidity));
            }
        })
    })
};
// searches and adds to history(event)
$("#searchCity").click(function() {
    city = $("#city").val().trim();
    getData();
    var checkArray = searchHistory.includes(city);
    if (checkArray == true) {
        return
    }
    else {
        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        var cityListButton = $("<a>").attr({
            // list-group-item-action keeps the search history buttons consistent
            class: "list-group-item list-group-item-action",
            href: "#"
        });
        cityListButton.text(city);
        $(".list-group").append(cityListButton);
        
        // clear all the local storage(not working after a page refresh)
        $('#clear').click( function() {
        window.localStorage.clear();
        location.reload();
        return false;
        });
    };
});
// listens for action on the history buttons(event)
$(".list-group-item").click(function() {
    city = $(this).text();
    getData();
});

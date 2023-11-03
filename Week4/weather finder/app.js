var weatherInfo = document.getElementById("weather-info");
var city = document.getElementById("cityInput");
var btn = document.getElementById("btn");
btn.addEventListener("click", function(){
    if (city.value == "") {
        alert("Please enter a city!");
    } else {
        let req = new XMLHttpRequest();
        req.open("GET", "https://api.openweathermap.org/data/3.0/onecall?${city}&exclude={part}&appid=a94b5f2625302e872ee720962b2ac5b9")
        req.onload = function() {
            var data = JSON.parse(req.responseText);
            printWeather(data);
        }
    };
    req.send();
})


var weatherInfo = document.getElementById("weather-info");
var city = document.getElementById("cityInput");
var btn = document.getElementById("btn");
btn.addEventListener("click", function(){
    if (city.value == "") {
        alert("Please enter a city name!");
    } else {
        var req = new XMLHttpRequest();
        let val = city.value;
        city.value = "";
        req.open("GET", "https://api.openweathermap.org/data/2.5/weather?q="+val+"&appid=f25e30077d9e53fd073f5cd13385fed8")
        req.onload = function() {
            console.log(req.responseText);
            var data = JSON.parse(req.responseText);
            printWeather(val, data);
        }
    };
    req.send();
})

function printWeather(city, data) {
    var htmlString = "";
    htmlString += "<p>" + "The weather in " + city + " is " + data["weather"][0]["description"] + ".<br>";
    var temp = data["main"]["temp"] - 273.15; //API returns temperature in kelvins, so subtract 273.15 to convert to celsius
    htmlString += "The temperature is " + String(temp.toFixed(2)) + "ºC with a wind speed of " + data["wind"]["speed"] + "m/s.</p><br><hr>";
    weatherInfo.insertAdjacentHTML("beforeend", htmlString);
}

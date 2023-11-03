var cityContainer = document.getElementById("city-info");
var btn = document.getElementById("btn");
btn.addEventListener("click", function(){
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://github.com/VIR-WADWANI/F28WP-lab1/blob/main/Week4/cities1.json');
    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        console.log(ourData[0]);
    };
    ourRequest.send();
})

function renderHTML(data){
    var htmlString = "this is a test";
    cityContainer.insertAdjacentHTML('beforeend' , htmlString);
}
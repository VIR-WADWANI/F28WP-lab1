var ourRequest = new XMLHttpRequest();

ourRequest.open('GET', 'https://github.com/VIR-WADWANI/F28WP-lab1/blob/main/Week4/cities1.json');
ourRequest.onload = function() {
    console.log(ourRequest.responseText);
};
ourRequest.send();

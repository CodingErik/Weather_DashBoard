// This is our API key. Add your own API key between the ""
var APIKey = "9e86fc9e3bf21c56f84b81c96613709c";

// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Monterrey,NuevoLeoni&appid=" + APIKey;

// We then created an AJAX call
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {

    // Create CODE HERE to Log the queryURL
    console.log(queryURL);
    // Create CODE HERE to log the resulting object
    console.log(response);
    // Create CODE HERE to calculate the temperature (converted from Kelvin)
    let K = response.main.temp;
    let F = (K - 273.15) * 1.80 + 32;
    // Create CODE HERE to transfer content to HTML
    $(".city").text(response.name);
    $(".wind").text(response.wind.speed);
    $(".humidity").text(response.main.humidity);
    $(".temp").text(F.toFixed(1));
    $('.sunrise').text(moment.unix(response.sys.sunrise).format('llll'));
    // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
    // Create CODE HERE to dump the temperature content into HTML


    //we are gonna need for main jumbotron
    //********************************************** */
    // city name  DONE 
    // temp         DONE 
    // humidity     DONE 
    // winds speed      DONE 
    // UV index         
    
    //********************************************** */




    // cards
    //********************************************** */
    // temp
    // humidity
    // winds speed
    // UV index  


    // extras 
    // sunrise 
    //********************************************** */
    
    
    // search input and history
    //********************************************** */
    // event prevent default
    // input search box
    // save to local data 
    //********************************************** */




});

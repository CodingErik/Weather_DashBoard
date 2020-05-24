// This is our API key. Add your own API key between the ""
var APIKey = "9e86fc9e3bf21c56f84b81c96613709c";
let cityName = 'Monterrey,NuevoLeon'; //input value from the search 

// this is the search button
$('searchCity').on('click', function(e){
    e.preventDefault();
    console.log('hello');
});
// Here we are building the URL we need to query the database
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid=" + APIKey;
                        // api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid=" + APIKey;
                        // api.openweathermap.org/data/2.5/weather?q=Monterrey,NuevoLeoni&appid=" + APIKey;
// We then created an AJAX call
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {

    // Create CODE HERE to Log the queryURL
    // console.log(queryURL);
    // Create CODE HERE to log the resulting object
    console.log(response);
    // Create CODE HERE to calculate the temperature (converted from Kelvin)
    // let K = response.main.temp;
    // let F = (K - 273.15) * 1.80 + 32;
    // Create CODE HERE to transfer content to HTML
    $(".city").text(response.city.name);
    $(".wind").text(response.list[0].wind.speed);
    $(".humidity").text(response.list[0].main.humidity);
    // $(".temp").text(F.toFixed(1));
    // $('.sunrise').text(moment.unix(response.sys.sunrise).format('llll'));
    // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
    // Create CODE HERE to dump the temperature content into HTML


    //we are gonna need for main jumbotron
    //********************************************** */
    // city name  DONE  DISPLAYING NOW!
    // temp         DONE DISPLAYING NOW!
    // humidity     DONE DISPLAYING NOW!
    // winds speed      DONE DISPLAYING NOW!
    // UV index         DONE
    
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

    // $.ajax({
    //     url: "http://api.openweathermap.org/data/2.5/uvi/forecast?lat={lat}&lon={lon}&appid="+ APIKey,
    //     // let practice sending a post request
    //     method: "GET"
    // }).then(function(response){
    
    //     // we want to provide the uv index data here
    //     console.log('this is the uv index data');
    //     console.log(response);
    
    
    // });


});






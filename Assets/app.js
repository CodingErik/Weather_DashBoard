
//************************************************************************************ */
//************************************************************************************ */
// current day, month, day, year, time time running the seconds
// lets try to make the clock change to display local time of the place that is searched
// $("#currentDay").text(moment().format("MMMM Do YYYY hh:mm:ss A"));

// setInterval(function () {
//     $("#currentDay").text(moment().format("MMMM Do YYYY hh:mm:ss A"));
// }, 1000);
//************************************************************************************ */



// This is our API key
let APIKey = "9e86fc9e3bf21c56f84b81c96613709c";
let cityName = 'Monterrey,NuevoLeon'; //input value from the search 

// // this is the search button
// $('searchCity').on('click', function (e) {
//     e.preventDefault();
//     console.log('hello');
// });

// this is target URL
let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {

    // Create CODE HERE to Log the queryURL
    // console.log(queryURL);
    // Create CODE HERE to log the resulting object
    console.log(response);



    // Current days info
    //********************************************** */
    $(".city").text(response.city.name);
    $(".wind").text(response.list[0].wind.speed);

    // we still need to the UV index
    // lon & lat for the uv index
    // response.city.coord.lat
    // response.city.coord.lon
    //********************************************** */


    // cards
    //********************************************** */
    for (let i = 0; i < 5; i++) {
        // icon URL
        let iconUrl = 'http://openweathermap.org/img/wn/';
        //  individual Icon for each days forecast
        let weatherIcon = iconUrl + response.list[i].weather[0].icon + '.png';
        
        // calculating conversion from Kelvin to Farenheit
        let K = response.list[i].main.temp;
        let F = (K - 273.15) * 1.80 + 32;

        // humidity for all the days
        $(".humidity" + i).text(response.list[i].main.humidity);

        // temp converted to ºF for all the dates
        $(".temp" + i).text(F.toFixed(1));

        // this is the icon for the each day forecast Appended to the html
        $('.icon'+i).append('<img src='+weatherIcon+'>');

        // setting the current date for the jumbotron display
        $('.day'+i).text(moment().add(i, 'days').format('M/DD/YY'));

        // $('.sunrise').text(moment.unix(response.sys.sunrise).format('llll'));
    }
    //********************************************** */







    // extras 
    // $('.sunrise').text(moment.unix(response.sys.sunrise).format('llll'));
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


// $.ajax({
//     url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey,
//     method: "GET"
// }).then(function(response){
//     console.log(response)
// })






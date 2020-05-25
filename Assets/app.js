

// take city value from the search bar
// append last viewed city 
// when last viewed city is seen 


// This is our API key
let APIKey = "9e86fc9e3bf21c56f84b81c96613709c";
// this is the city we are currently searching
let cityName = 'Monterrey,NuevoLeon';



// This is a default request to the API to get the user started with an example
requestAjax(cityName);

// this is the search button
$('#searchCity').on('click', function (e) {
    // prevents the page from reloading
    e.preventDefault();

    // this is the value that is typed in by the user 
    let value = $('#cityInputValue').val()

    if (value === '') {
        // if the input is not value the don't run the request 
        return
    } else {
        requestAjax(value);
    }

});


// this function will do a GET request and populate the dashboard
function requestAjax(cityName) {

    // this is target URL
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // coordinates of current city 
        let lat = response.city.coord.lat;
        let lon = response.city.coord.lon;
        // for testing pusporses
        // console.log(lat);
        // console.log(lon);

        // prependding search entry to history 
        // it will not append if the city has been searched before
        // if(cityName)
        // ************CITY APPEND WAS HERE
        prependCity(cityName);

        // Current days info
        //********************************************** */
        // city name 
        $(".city").text(response.city.name);
        // wind speed in MPH 
        $(".wind").text(response.list[0].wind.speed);

        //getting the current day UV index
        $.ajax({
            url: `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`,
            method: "GET"
        }).then(function (response) {

            // this is the current Uv value 
            let curntUv = response.value;

            // // this is the current Uv index data just for testing
            // console.log('this is the uv index data');
            // console.log(curntUv);

            if (curntUv < 3) {
                //color turn green 
                $('.uvIndex').addClass('bg-success');
                $('.uvIndex').text(`${curntUv}`);
                $('.uvStatusMsg').text(' LOW');
            } else if (curntUv <= 6) {
                // color turns yellow 
                $('.uvIndex').addClass('bg-warning');
                $('.uvIndex').text(`${curntUv}`);
                $('.uvStatusMsg').text(' MODERATE');
            } else if (curntUv <= 8) {
                // color turns orange 
                $('.uvIndex').addClass('bg-orange');
                $('.uvIndex').text(`${curntUv}`);
                $('.uvStatusMsg').text(' HIGH');
            } else if (curntUv < 11) {
                // color turns red 
                $('.uvIndex').addClass('bg-danger');
                $('.uvIndex').text(`${curntUv}`);
                $('.uvStatusMsg').text(' VERY HIGH');
            } else if (curntUv >= 11) {
                // color turns purple 
                $('.uvIndex').addClass('bg-extremePurple');
                $('.uvIndex').text(`${curntUv}`);
                $('.uvStatusMsg').text(' EXTREME');
            }

        });
        //********************************************** */

        // WEATHER FORECAST FOR EACH DAY 
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
            $('.icon' + i).attr('src', weatherIcon);

            // setting the current date for the jumbotron display
            $('.day' + i).text(moment().add(i, 'days').format('M/DD/YY'));

            // $('.sunrise').text(moment.unix(response.sys.sunrise).format('llll'));
        }
        //********************************************** */

        //comments 
        {
            // search input and history
            //********************************************** */
            // event prevent default
            // input search box
            // save to local data 
            //********************************************** */


            //EXTRAS*** set up a running clock for each local time 
            //EXTRAS*** set up POST
            //EXTRAS*** make the asthetic of the API better 
            //EXTRAS*** set up UV forecast for all week using the forecast Uv API
            //EXTRAS*** use bootswatch to find a cool UI for the weather dashboard
            //************************************************************************************ */
            //************************************************************************************ */
            // current day, month, day, year, time time running the seconds
            // lets try to make the clock change to display local time of the place that is searched
            // $("#currentDay").text(moment().format("MMMM Do YYYY hh:mm:ss A"));

            // setInterval(function () {
            //     $("#currentDay").text(moment().format("MMMM Do YYYY hh:mm:ss A"));
            // }, 1000);
            //************************************************************************************ */
        }
    });



}


// this is mapped the the search history buttons 
// when we click on any of the buttons we run a request for that city again
$('.searchHistory').on('click', function (e) {
    let userSelection = $(e.target).text();  //e.target.innerText;

    // to see the user input value test  
    // console.log(userSelection);

    // sends request to our requestAjax function
    requestAjax(userSelection);

});



// this function prepends a history selection
function prependCity(cityName) {

    // have some way of not prepend things that have already been prepended

    // if(cityName === )



    // prependding search entry to history 
    // it will not append if the city has been searched before
    // if(cityName)
    $('.searchHistory').prepend(`<a class="list-group-item list-group-item-action callbackThisTown">${cityName}</a>`);
}





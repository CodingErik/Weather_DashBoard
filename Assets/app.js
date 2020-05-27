
// array to keep track of history values  
let historyArr = []

// calls the seach History so that we have the last city 
// or request a default
getLastOrDefault();



// SEARCH BUTTON
// calls the request function with the user input value 
//********************************************** */
$('#searchCity').on('click', function (e) {
    // prevents the page from reloading
    e.preventDefault();

    // this is the value that is typed in by the user 
    let value = $('#cityInputValue').val()

    // if the input is not value the don't run the request 
    if (value === '') {
        return
    } else {
        requestAjax(value);
    }

});
//********************************************** */

// ClEAR HISTORY BUTTON
// calls the request function with the user input value 
//********************************************** */
$('#clearHistoryBtn').on('click', function (e) {
    // prevents the page from reloading
    e.preventDefault();

    // calls the delete history function
    deleteHistory()

});
//********************************************** */


// GET REQUEST FUNCTION
// this function will do a GET request and populate the dashboard
//********************************************** */
function requestAjax(cityName) {

    // This is our API key
    let APIKey = "9e86fc9e3bf21c56f84b81c96613709c";

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

        console.log('this is the wrong one', response);


        //CITY APPEND ************ ************ ************
        // prependding search entry to history 
        // it will not append if the city has been searched before
        // pushing it to the historyArr
        checkForDuplicates(cityName);
        //********************************************** */


        // persist the last city search
        localStorage.setItem('lastCity', cityName);




        // Current days info
        //********************************************** */
        // city name 
        $(".city").text(response.city.name);
        // wind speed in converted from meters/seconds to MPH 
        $(".wind").text((response.list[0].wind.speed * 2.23694).toFixed(1));



        //getting the [CURRENT DAY UV INDEX]
        //********************************************** */
        //********************************************** */
        $.ajax({
            url: `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`,
            method: "GET"
        }).then(function (response) {

            // this is the current Day Uv value 
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
        //********************************************** */


        // WEATHER 5-FORECAST FOR EACH DAY 
        //********************************************** */
        for (let i = 0; i < 6; i++) {
            // icon URL
            let iconUrl = 'http://openweathermap.org/img/wn/';
            //  individual Icon for each days forecast
            let weatherIcon = iconUrl + response.list[i].weather[0].icon + '@2x.png';
            let weatherDescription = response.list[i].weather[0].description;

            // used to test the weather icons
            // console.log(weatherDescription)


            // depending on the time the ajax will pull different array data from the API
            // if it's 

            // the first forecast needs to be the one for today not tomorrow 
            // we need to figure out a way to get the forecast according to the time of the day
            // somehow use moment to add i + so depending on the time so we can get the right forecast for the time


            // calculating conversion from Kelvin to Farenheit
            let K = response.list[i].main.temp;
            let F = (K - 273.15) * 1.80 + 32;

            // humidity for all the days
            $(".humidity" + i).text(response.list[i].main.humidity);

            // temp converted to ºF for all the dates
            $(".temp" + i).text(F.toFixed(0));

            // this is the icon for the each day forecast Appended to the html
            $('.icon' + i).attr('src', weatherIcon);

            // this is the description for the weather Icon 
            $('.description' + i).text(weatherDescription);

            // [DAYS] setting the current date for the jumbotron display
            $('.day' + i).text(moment().add(i, 'days').format('M/DD/YY'));

            // $('.sunrise').text(moment.unix(response.sys.sunrise).format('llll'));
        }
        //********************************************** */


    });



}
//********************************************** */





//SEARCH HISTORY CLICKS REQUEST'S
//********************************************** */
// this is mapped to the search history buttons 
// when we click on any of the buttons we run a request for that city again
$('.searchHistory').on('click', function (e) {
    let historySelection = $(e.target).text();  //e.target.innerText;

    // to see the user input value test  
    // console.log(historySelection);

    // sends request to our requestAjax function
    requestAjax(historySelection);

});
//********************************************** */


// CHECKS FOR DUPLICATES FUNCTION
// **** GUARDS AGAINST DUPLICATES
//********************************************** */
// by checking the history array this function avoids duplicates
// it will not append if the city has been searched before
function checkForDuplicates(cityName) {

    // DONE
    // need to have some way of checking the appended values
    // so that we don't append if the value has already been appended
    // this for loop iterates through out values to makes sure that we don't append something
    // that has already been appended
    for (let i = 0; i < historyArr.length; i++) {
        // if the city name is already in the array 
        // then we don't need prepended again
        if (cityName === historyArr[i]) {
            return;
        }
    }

    //call the prepend function
    prepend(cityName);

    // pushed the new city input into the  historyArr 
    pushToHistoryArr(cityName);

}
//********************************************** */

// PUSH TO ARRAY FUNCTION
// push to the historyArr 
//********************************************** */
function pushToHistoryArr(city) {
    historyArr.push(city);
}
//********************************************** */

// PREPEND FUNCTION 
//********************************************** */
function prepend(cityName) {
    // this function prepends history selection 
    // prependding search entry to history div              
    $('.searchHistory').prepend(`<a class="list-group-item list-group-item-action callbackThisTown  list-group-item-primary text-primary ">${cityName}</a>`);
}
//********************************************** */


// DELETE HISTORY FUNCTION
//********************************************** */
// This function deletes our history  
function deleteHistory() {

    // empties local storage
    localStorage.clear();

    // empties the history array
    historyArr = [];

    // empties the searchHistory div 
    $('.searchHistory').empty();

}
//********************************************** */


// GET LAST CITY OR DEFAULT CITY FUNCTION 
//**** PERSISTED DATA **************************
// this function get data if there is any data persisted
// if no data is persisted then we use the default weather of Austin, TX
//********************************************** */
function getLastOrDefault() {
    let cityName = 'Austin';
    let lastCity = localStorage.getItem('lastCity');
    if (lastCity !== null) {
        requestAjax(lastCity);
    } else {
        requestAjax(cityName);
    }
};
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
    //EXTRAS*** add chance of precipitation
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





# 06 Weather Dashboard

This is a weather dashboard application. You can see a five day forecast for any city of your choice.
Simply type in the city you want in the search bar. This application is powered by the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities.

The following image demonstrates the application functionality:

![weather dashboard demo](./Assets/06-server-side-apis-homework-demo.png)

## Client Scope

>User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

> Acceptance Criteria

```
GIVEN a weather dashboard with form inputs   
WHEN I search for a city                      
THEN I am presented with current and future conditions for that city and that city is added to the search history                              
WHEN I view current weather conditions for that city   
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index   
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe                                                              
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity                             
WHEN I click on a city in the search history                                
THEN I am again presented with current and future conditions for that city        
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```
## UV index

> this project follows the UV Index Scale
> for more info on this scale visit the gov site @ https://www.epa.gov/sunsafety/uv-index-scale-0

![Uv index Scale](./Assets/Uvindex.gif)




## Contributors

> Erik De Luna ~ Developer 

## Links

> You can view the application here: https://codingerik.github.io/Weather_DashBoard/
>
> This is the Repo for the application: https://github.com/CodingErik/Weather_DashBoard

# 06-weather_dashboard
Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

## Links:
```
Live Site: 
     https://EdenKhaos.github.io/06-weather_dashboard/
   
Code Repo: 
     https://github.com/EdenKhaos/06-weather_dashboard
  
Issues & Explanation:
     https://github.com/EdenKhaos/06-weather-dashboard/blob/master/README.md

```

## Narrative to try to accomplish:
1.  Create an app that uses OpenWeather API to retrieve weather data for cities. 
2.  Each city search is stored into the list with use of local storage.
3.  User should be able to click on a stored list item to view weather conditions of that location again even after page refresh.
4.  Current conditions are listed for the city searched, which includes city name, the date, an icon to represent the weather conditions, temperature, humidity, wind speed and the UV index.
5.  Below the current conditions a five day forecast is listed with dates, weather icon, temperature and humidity listed. 
6. **bonus** create clear click event to clear out local storage to start a new list of city searches.

## Issues:
1. Had to write line by line to get the correct calls in the correct order to pull from the weather API correctly and understand what was being coded.
2. Syntax errors/spelling errors caused a lot of my time to be eaten up as I was trying to find them.
3. I tried to do a little more and create a clear button to clear all of the listed local storage items. This button has to be clicked to clear the local storage not a refresh of the page. However, when a refresh occurs the clear local storage button stops working until another city is listed, then it will work again. Need to find out why that happens. 
4. I realized that the form needs to be somewhat specific when typing location by city and state verses just city name. Some city names by themselves work while others do not. Other times listing just the city name populates the first popular city. For example Portland is for Portland Oregon not Portland Maine until specified by state.
5. Overall the look of the app of the example gif, I didn't want to spend more on the CSS as th JS took the most time.

## User Story:

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Acceptance Criteria:

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
## Screenshot;
![home](public/assets/weather_dashboard.jpg)

## A few sources used to help guide the making of this app (google-foo)
https://codeburst.io/how-to-display-openweathermap-api-data-in-a-jquery-datatables-a5a0a91fb62
https://www.freecodecamp.org/news/building-a-weather-app-a3cec42b11fa/
https://workshops.hackclub.com/dashboard
https://www.webdesignerdepot.com/2013/04/how-to-use-local-storage-for-javascript/
https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
https://stackoverflow.com/questions/7667958/clearing-localstorage-in-javascript

## Pseudo code for html
1. standard set up with links and title
2. set up of header bar
3. search column, form and button
4. search button
5. clear button
6. left column / list
7. main card
8. five day
9. script links

## Pseudo code for css
1.  simple set up

## Pseudo code for js
1. contains list (empty until given event)
2. returns local storage search history
3. lists up to 8 locations
4. creates links/buttons https://getbootstrap.com/docs/4./components/list-group/
5. appends history as a button below the search field
6. prompt getItems
7. main card
8. starts cal for current conditions
9. requests
10. using moment to call the date
11. takes the icon code from the response and assigns it to iconCode
12. builds the main card icon url
13. takes the name added from the search and the date/format from moment and creates a single var
14. displays name in main card
15. displays icon on main card
16. converts K and removes decimals using Math.round
17. appends fahrenheit degrees using short key code
18. appends humidity
19. appends wind speed
20. takes from the response and creates a var used in the next request for UV index
21. separate request for UV index, requires lat/long
22. displays UV in main card and is color coded based off of intensity
23. another call for the 5-day (forecast)
24. displays 5 separate columns from the forecast response for 5 days
25. start for loop
26. creates the columns
27. uses moment for the date
28. displays date
29. brings back the icon url suffix
30. builds the icon URL
31. displays the icon
32. converts K and removes decimals using Math.round
33. displays temp
34. creates a var for humidity from the response
35. displays humidity
36. searches and adds to history(event)
37. list-group-item-action keeps the search history buttons consistent
38. clear all the local storage
39. listens for action on the history buttons(event)
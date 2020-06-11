// ==UserScript==
// @name         Pilota-Scraper
// @version      0.1
// @description  Obtain flight data!
// @author       Michael Mathew
// @match        *://*.kayak.com/flights*
// @grant        none
// @run-at       document-idle
// @inject-into  content
// ==/UserScript==



//images on how to run 
//csv format 
//unit test
//speed O(log or O(1))
//Notes on what happens if website changes 
//Note how how make use of system 
//replace for loops woth maps
//casing
//indents
//delete comments all 

//wzWk-price_aTab
//js-border-container _ia4 _ia5 _ic1 _iCq _kK6 _iCu

//id=JZDCIVFn0Z-5    
//id="inline-1"   !!!!!!!for each new page   every Base-Horizon---!!!! 

//contains---------details-leg-details


//section content, header (inside sction)---leg checkbox(inside header),card right 
///-header---leg checkbox
//1. Airline Name (ex: Jetblue or AA)---leg checkbox,each card, card right 
//2. Flight Number (ex: 160)-leg checkbox,card right, plane details
//3. Departure airport code (ex: JFK)---eg checkbox,card right ,origin
//4. Arrival airport code (ex: LAX)---leg checkbox,card right , destination
//5. Departure Date (ex: 05/19/2020)---leg checkbox,class=date(inside content card left),card right,
//6. Time en route (ex: 5h 41m)---leg checkbox,class=right-column segment-details, duration details()
//button download
//docuemtn create elemtn 
//add listenr download button if exists keep track last


//flightnumbers, dates, origin destination
//Flights-Results-FlightLegDetails-------segment-row js-segment(flightnumber)-----date(date)
//Flights-Results-FlightLegDetails-------Common-Widgets-Checkbox-Checkbox default select-leg-checkbox disable-mouseout-animation size-m js-checkbox-container(Depart/Arrive) 
//segment-row js-segment(flightnumber)-----planeDetails details-subheading(Airline and flight)
//segment-row js-segment(flightnumber)--------segmentDuration text-row(time in rout)
//segment-row js-segment------airport-codes details-heading text-row(dep and arrival code)


//every []
//check Flights-Results-FlightLegDetails common widgets
//if
//segment=row get fligthnumber there
//child segment get date, airline, time in route,departure and arrival code
(function() {
    runScraper();
    var xx= document.querySelectorAll('.Flights-Results-FlightLegDetails')
    console.log(xx.length)

    for (var i = 0; i < xx.length; i++) {

    var x=xx[i].querySelector('.Common-Widgets-Checkbox-Checkbox.default.select-leg-checkbox.disable-mouseout-animation.size-m.js-checkbox-container').textContent
    console.log(x)
    var y=xx[i].querySelector('.date').textContent
    console.log(y)


    var yy=xx[i].querySelector('.segment-row.js-segment')
    var c=yy.querySelector('.planeDetails.details-subheading').textContent
    console.log(c)
    var v=yy.querySelector('.segmentDuration.text-row').textContent
    console.log(v)
    var b=yy.querySelector('.airport-codes.details-heading.text-row').textContent
    console.log(b)
}



})();

function runScraper() {
    // this will get the first card in the kayak search results
     var bestFlights = document.getElementsByClassName('best-flights-list')
     console.log(bestFlights);
}

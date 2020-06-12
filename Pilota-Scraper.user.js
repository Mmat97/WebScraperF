// // ==UserScript==
// @name         Pilota-Scraper
// @version      0.1
// @description  Obtain flight data!
// @author       Michael Mathew
// @match        *://*.kayak.com/flights*
// @grant       GM_addStyle
// @run-at       document-idle
// @inject-into  content
// ==/UserScript==
(function ()
{
	runScraper();

	// Organize only neccesaary info in csv file
	var csvData = [
		['Status', 'DepDate', 'Airline', 'Flight No.', 'Time of Flight', 'ArrAirCode', 'DepAirCode']
	]

	var flightDetails = document.querySelectorAll('.Flights-Results-FlightLegDetails')
	var fdLength = flightDetails.length
	var flightLeg;
	csvData = getFlightTimeDetails(flightDetails, 0, csvData)
    console.log(csvData)
	var moreResultsButton = document.querySelector('.resultsPaginator')

	moreResultsButton.onclick = function ()
	{
		setTimeout(() =>
		{
			flightDetails = document.querySelectorAll('.Flights-Results-FlightLegDetails')
			csvData = getFlightTimeDetails(flightDetails, fdLength, csvData)


		}, 3000);
	};

	var zNode = document.createElement('div');
	zNode.innerHTML = '<button id="myButton" type="button">' + 'Download Flight Data</button>';
	zNode.setAttribute('id', 'myContainer');
	document.body.appendChild(zNode);


	var downloadFlights = document.getElementById("myButton")
	downloadFlights.onclick = function ()
	{
		setTimeout(() =>
		{
			downloadCSV(csvData)
		}, 3000);
	};




})();


/* Gets the details of flight and formats code for csv */
function getFlightTimeDetails(flightDetails, valueOfIndex, csvData)
{
	// All flight details
	for (var i = valueOfIndex; i < flightDetails.length; i++)
	{
		var flightLeg = flightDetails[i].querySelectorAll('.segment-row.js-segment')
        var flight = (flightDetails[i].querySelector('.spec-leg.left').textContent).trim('↵↵↵↵↵↵')
		for (var j = 0; j < flightLeg.length; j++)
		{
			//append each flight row
			var legOfFlight = getFlightFormat(flightLeg, j,flight)

			csvData = csvData.concat(legOfFlight)


		}
	}
	return csvData


}

/* Gets flight details and formats for csv*/
function getFlightFormat(flightLeg, j,flightstatus)
{
	var depDate = flightLeg[j].querySelector('.date').textContent

	var planeDetails = flightLeg[j].querySelector('.planeDetails.details-subheading').textContent
	var planeType = planeDetails.split(" · ");
	var planeTypeArray = planeType[0].split(" ").join("");
	var flightNo = planeTypeArray.match(/\d+/g);
	var airlineName = planeTypeArray.match(/[a-zA-Z]+/g);

	var flightDuration = flightLeg[j].querySelector('.segmentDuration.text-row').textContent

	var airportNames = flightLeg[j].querySelector('.airport-codes.details-heading.text-row').textContent
	var airportNamesArray = airportNames.split("-")

	var airportFirst = airportNamesArray[0].split('(')
	var airportOriginCode = airportFirst[1].split(')')

	var airportSecond = airportNamesArray[1].split('(')
	var airportDestinationCode = airportSecond[1].split(')')

    var flight=flightstatus
    
    


	var leg = [
		[flight, depDate.trim('↵'), airlineName[0], flightNo[0], flightDuration.trim('↵'), airportOriginCode[0], airportDestinationCode[0]]
	]
	return leg
}
















function downloadCSV(csvData)
{
	var csvContent = csvData[0].join() + '\n';
	for (var i = 1; i < csvData.length; i++)
	{
		csvContent = csvContent + (csvData[i]).join() + '\n';
	}
	var link = window.document.createElement("a");
	link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvContent));
	link.setAttribute("download", "flights.csv");
	link.click();

}



GM_addStyle(`
    #myContainer {
      position: "fixed",
      top: "15%",
      right: "4%",
      "z-index": 3,
      fontWeight: "600",
      fontSize: "14px",
      backgroundColor: "#4700cc",
      color: "white",
      border: "none",
      padding: "10px 20px"
    }
`);



function runScraper()
{
	// this will get the first card in the kayak search results
	var bestFlights = document.getElementsByClassName('best-flights-list')
	console.log(bestFlights);
}
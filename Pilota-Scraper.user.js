// ==UserScript==
// @name         Pilota-Scraper
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*.kayak.com/flights*
// @grant        none
// @run-at       document-idle
// @inject-into  content
// ==/UserScript==


(function() {
    runScraper();

    // Your code here...
})();

function runScraper() {
    // this will get the first card in the kayak search results
     var bestFlights = document.getElementsByClassName('best-flights-list')
     console.log(bestFlights);
}

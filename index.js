const port = 8000
const busTimesUrl = 'https://www.stagecoachbus.com/bus-stop?busStop%5BGeocode%5D%5BGrid%5D%5Bvalue%5D=WGS84&busStop%5BGeocode%5D%5BLongitude%5D=-1.5759402642028795&busStop%5BGeocode%5D%5BLatitude%5D=54.98407011141365&busStop%5BName%5D=Heaton%2C+Chillingham+Road-Ninth+Avenue&busStop%5BStopLabel%5D=410000009152'
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

axios(busTimesUrl)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const busTimes = []
        // Temp scarping target (h2), update to bus times element when live.
        // Cheerio -  // $('li[class=bus-data]').html().each(function ()
        // $('li[class=orange]').html();
        $('li[class=bus-data]').html().each(function () {
            const times = $(this).text('data-service-number')
            console.log(times)
            // Append data to array
            busTimes.push(times)           
        }) 
        console.log(busTimes)
    })
    
app.listen(port, () => console.log(`Server running on port ${port}`))

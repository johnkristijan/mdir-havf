import express from 'express'

import fetch, { Headers } from 'node-fetch'

const app = express()
const port = 1338

// Root - Server health check API
app.get('/', (req, res) => {
    res.send('Server is running - v1.0.0')
})

// API - vannmiljodatabase - havforsuringsdata
app.get('/v1/waterlocationlatlongs', async (req, res) => {
    // PSEUDO code
    // steg 1: kalle på /v1/havforsuringsdata API'et nedenfor
    // steg 2: sortere på unike WaterLocationID's (liste med ID'er)
    // steg 3: loope igjennom listen med ID'er og gjøre oppslag mot arcGIS serveren:
    const baseUrl = "https://arcgis06.miljodirektoratet.no/arcgis/rest/services/vannmiljo/vannmiljo/MapServer/1/query?"
    const waterLocationID = "38280"
    const queryParams = `where=waterlocationid+%3D+${waterLocationID}&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson`

    res.send([])

    // returns a list with the following format:
    //     [
    //     { waterLocationID: 12344, lat: 64.312312, lng: 11.0000123},
    //     { waterLocationID: 12345, lat: 64.312312, lng: 11.0000123},
    //     { waterLocationID: 12346, lat: 64.312312, lng: 11.0000123},
    //     { waterLocationID: 12347, lat: 64.312312, lng: 11.0000123},
    //     { waterLocationID: 12348, lat: 64.312312, lng: 11.0000123},
    //     { waterLocationID: 12349, lat: 64.312312, lng: 11.0000123},
    // ]
})

// API - vannmiljodatabase - havforsuringsdata
app.get('/v1/havforsuringsdata', async (req, res) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    let urlencoded = new URLSearchParams();
    urlencoded.append("MaxReturnCount", "66000");
    urlencoded.append("Username", "vannmiljowebapi");
    urlencoded.append("Password", "vanntemppw");
    urlencoded.append("ActivityID", "HAVF");
    
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    const url = "https://vannmiljowebapitest.miljodirektoratet.no/api/Public/GetRegistrations"
    
    const response = await fetch(url, requestOptions)

    if (response && response.ok) {
        const body = await response.json()
        res.send(body.Result)
    } else {
        res.send('api failed')
    }
})


// server startup method
app.listen(port, () => {
    console.info(`HAVFORSURING transport proxy started - now listening on port ${port}`)
})

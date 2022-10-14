import express from 'express'

import fetch, { Headers } from 'node-fetch'

const app = express()
const port = 1338

// Root - Server health check API
app.get('/', (req, res) => {
    res.send('Server is running - v1.0.0')
})

// API - vannmiljodatabase - havforsuringsdata
app.get('/v1/havforsuringsdata', async (req, res) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    let urlencoded = new URLSearchParams();
    urlencoded.append("MaxReturnCount", "10");
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

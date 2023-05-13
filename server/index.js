const express = require("express");
const pgp = require('pg-promise')(/* options */)

const PORT = process.env.PORT || 3001;

const app = express();
const db = pgp('postgres://postgres:tono1234@localhost:5432/traveldb')

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/api/getCity/:city", (req, res) => {
  db.one(`SELECT "ID" FROM public."City" WHERE Name='${req.params.city}' LIMIT 1`)
    .then((data) => res.send(data));
});

app.get("/generateTravel/:city/:days", (req, res) => {
  const availableHoursPerDay = 10;
  
  let sightsArray;
  let timeAvailable = req.params.days * availableHoursPerDay;
  

  db.many(`SELECT s."ID", s."Name", s."Type", s."Address", s."CityID", s."AverageTimeInHours", s."PopularityScale" FROM public."Sight" s LEFT JOIN public."City" ON public."City"."Name" = 'Lviv' ORDER BY RANDOM() LIMIT 100`) //LEFT JOIN public."City" ON public."City"."Name" = '${req.params.city}'
    .then((data) => {
      sightsArray = data;
      const placesToVisit = [];
      while ((timeAvailable > 0) && (sightsArray.length > 0)) {
        let newRandomPlace = Math.floor(Math.random() * sightsArray.length)
        placesToVisit.push(sightsArray[newRandomPlace]);
        timeAvailable -= placesToVisit[placesToVisit.length - 1].AverageTimeInHours;
        sightsArray.splice(newRandomPlace, 1);
      }
      res.send(placesToVisit);
    })
    .catch((error) => {
      console.log('ERROR:', error)
    });
})
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// connecting to PostgreSQL


db.one('SELECT $1 AS value', 123)
  .then((data) => {
    console.log('DATA:', data.value)
  })
  .catch((error) => {
    console.log('ERROR:', error)
  })
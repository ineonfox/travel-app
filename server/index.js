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
    .then((data) => res.send(data))
    .catch((error) => {
      console.log('ERROR:', error)
    });
});

app.get("/api/getTrainId/:city", (req, res) => {
  db.one(`SELECT "ExpressCode" FROM public."TrainExpressCode" tec INNER JOIN "City" cit ON tec."CityID" = cit."ID" WHERE cit."Name" = '${req.params.city}' LIMIT 1`)
    .then((data) => res.send(data))
    .catch((error) => {
      console.log('ERROR:', error)
    });
});

app.get("/generateTravel/:city/:days", (req, res) => {
  const availableHoursPerDay = 10;
  
  let sightsArray;
  let timeAvailable = req.params.days * availableHoursPerDay;
  

  db.many(`SELECT s."Name", s."Address", s."AverageTimeInHours", s."Type", s."ID", s."ImageName", s."PopularityScale", cit."Name" as "CityName" FROM "Sight" s INNER JOIN "City" cit ON s."CityID" = cit."ID" WHERE cit."Name" = '${req.params.city}' ORDER BY RANDOM() LIMIT 100`) //LEFT JOIN public."City" ON public."City"."Name" = '${req.params.city}'
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
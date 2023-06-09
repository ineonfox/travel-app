const express = require("express");
const pgp = require('pg-promise')(/* options */)
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3001;

const app = express();
const db = pgp('postgres://postgres:tono1234@localhost:5432/traveldb')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// app.get("/api/getCity/:city", (req, res) => {
//   db.one(`SELECT "ID" FROM public."City" WHERE Name='${req.params.city}' LIMIT 1`)
//     .then((data) => res.send(data))
//     .catch((error) => {
//       console.log('ERROR:', error)
//     });
// });

app.get("/api/getTrainId/:city", (req, res) => {
  db.one(`SELECT "ExpressCode" FROM public."TrainExpressCode" tec INNER JOIN "City" cit ON tec."CityID" = cit."ID" WHERE cit."Name" = '${req.params.city}' LIMIT 1`)
    .then((data) => res.send(data))
    .catch((error) => {
      console.log('ERROR:', error)
    });
});

app.get("/api/getRecipe/:city", (req, res) => {
  db.one(`SELECT cr."Name", cr."Ingredients", cr."Description", cr."TimeToPrepare", cr."CookingProcessDesc", cr."ImageName" FROM public."CookingRecipe" cr INNER JOIN "City" cit ON cr."CityID" = cit."ID" WHERE cit."Name" = '${req.params.city}' LIMIT 1`)
    .then((data) => res.send(data))
    .catch((error) => {
      console.log('ERROR:', error)
    });
});

app.get("/api/getFacts/:type/:city", (req, res) => {
  db.one(`SELECT rf."Name", rf."Description", rf."ImageName" FROM public."RegionFact" rf INNER JOIN "City" cit ON rf."CityID" = cit."ID" WHERE cit."Name" = '${req.params.city}' AND rf."Type" = '${req.params.type}' LIMIT 1`)
  .then((data) => res.send(data))
  .catch((error) => {
    console.log('ERROR:', error)
  });
});

app.post("/api/register", (req, res) => {
  let data = req.body;
  console.log(JSON.stringify(data));
  // res.send('Data Received: ' + JSON.stringify(data));
  
  db.one(`INSERT INTO public."User" ("Nickname", "Email", "Password") VALUES ('${data.nickname}'::character varying, '${data.email}'::text, '${data.password}'::text) returning "ID"`)
  // db.one(`SELECT rf."Name", rf."Description", rf."ImageName" FROM public."RegionFact" rf INNER JOIN "City" cit ON rf."CityID" = cit."ID" WHERE cit."Name" = '${req.params.city}' AND rf."Type" = '${req.params.type}' LIMIT 1`)
  .then((data) => res.send(data))
  .catch((error) => {
    console.log('ERROR:', error)
  });
});

app.post("/api/login", (req, res) => {
  let data = req.body;
  console.log(JSON.stringify(data));
  db.any(`SELECT * FROM public."User" u WHERE u."Email" = '${data.email}'`)
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
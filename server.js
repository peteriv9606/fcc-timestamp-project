// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
  //check to see if correct input (Accepted format - YYYY-MM-DD/YYYY-M-D starting from: 1000-01-01 )
  var input = req.params.date;
  var output = {};
  try {
    var date = new Date(input);
    var dateUnix = new Date(parseInt(input));
    //check if input is in a valid date format
    //if successful - its unix maybe?
    if (date != "Invalid Date") {
      //we are dealing with a valid date
      console.log("its date");
      var output = {
        unix: date.getTime(),
        utc: date.toUTCString(),
      };
      res.json(output);
    } else if (dateUnix != "Invalid Date") {
      //we are dealing with a unix
      console.log("its unix", dateUnix);
      var output = {
        unix: dateUnix.getTime(),
        utc: dateUnix.toUTCString(),
      };
      res.json(output);
    } else throw "Invalid Date";
  } catch (err) {
    //neither a date or a unix
    console.log("its neither unix/date");
    var output = {
      error: err,
    };
  }
  res.json(output);
});

app.get("/api", (req, res) => {
  var output = {};
  //empty string / empty variable
  var utc = Date.now();
  var unix = Date.now();
  output.unix = new Date(unix).getTime();
  output.utc = new Date(utc).toUTCString();
  res.send(output);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

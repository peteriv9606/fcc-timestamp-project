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
  var correctInputDate = RegExp(
    /^(([1-9][0-9][0-9][0-9])|([1-9][0-9][0-9]))-([1-9]|0[1-9]|1[0-2])-([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])$/g
  );
  var correctInputUnix = RegExp(/^[\d]+$/g);

  var isUnix = correctInputUnix.test(input); //test if the input is in correct UNIX format (only numbers)
  var isDate = correctInputDate.test(input); //test if the input is in correct Date Format

  if (isUnix || isDate) {
    //input(date) is in UNIX format OR input (date) is in correct Date format
    var output = {};
    if (isUnix) {
      //UNIX format
      var unix = new Date(parseInt(input));
      var utc = unix.toUTCString();
      output.unix = parseInt(input);
      output.utc = utc;
    } else {
      //DATE format
      var utc = new Date(input).toUTCString();
      var unix = new Date(input).getTime();
      output.unix = unix;
      output.utc = utc;
    }
  } else {
    //input is neither UNIX or correct Date format
    output = { error: "Invalid Date" };
  }

  res.json(output);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

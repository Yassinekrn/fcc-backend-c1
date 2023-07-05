// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/:data?", function(req, res) { // :data? is optional parameter
  const time = req.params.data|| "";
  
  if (time === "") {
    const now = new Date();
    res.json({ unix: now.getTime(), utc: now.toUTCString() });
  } else {
    let date;
    
    if (!isNaN(Number(time))) { // Unix timestamp passed as data
      date = new Date(Number(time));
    } else {
      date = new Date(time);
    }
    
    if (date.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: date.getTime(), utc: date.toUTCString() });
    }
  }
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

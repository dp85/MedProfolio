// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

//
// Example request:
// http://files.parsetfss.com/XXX/YYY
//
app.get('/images/:tag1/:tag2', function(req, res) {

  Parse.Cloud.httpRequest({
    url: 'http://files.parsetfss.com/' + req.params.tag1 + "/" + req.params.tag2,
    success: function(httpResponse) {
      // add CORS headers
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Headers", "X-Requested-With");
      res.set('Access-Control-Allow-Headers', 'Content-Type');

      res.send(httpResponse.buffer);
    },
    error: function(err) {
      console.log(err);
      res.send('Error finding file');
    }
  });

});

// Attach the Express app to Cloud Code.
app.listen();

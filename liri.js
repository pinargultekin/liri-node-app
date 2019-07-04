require("dotenv").config();

var fs = require('fs');

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

const axios = require('axios');

var moment = require('moment');
moment().format();

var cmd = process.argv[2];
var input = function () {
    var name = [];
    for (var i = 3; i < process.argv.length; i++) {
        name.push(process.argv[i]);
    }
    return name.join(" ");
}();

switch (cmd) {
    case "concert-this":
        concert(input);
        break;
    case "spotify-this-song":
        spotifyThis(input);
        break;
    case "movie-this":
        movie(input);
        break;
    case "do-what-it-says":
        doThis(input);
        break;
    default: console.log("\nPlease check your statement.");
};

//Functions


//Concert-this
function concert(input) {
    var url = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    axios.get(url)
        .then(function (response) {

            var Data = response.data;
            var results;

            for (var i = 0; i < Data.length; i++) {

                var results = Data[i];

                console.log("\nResults for " + input + "\nVenue name: " + results.venue.name + "\nVenue location: " + results.venue.city + ", " + results.venue.region +" " +results.venue.country+ "\nEvent date: " + moment(results.datetime).format("MM-DD-YYYY") + "\n\n---------------------------\n");
                // results.push("\nResults for "+ input + "\nVenue name: " + results.venue.name + "\nVenue location: " + results.venue.city + ", " + results.venue.region + "\nEvent date: "+ moment(results.datetime).format("MM-DD-YYYY")+"\n\n---------------------------\n");
            }

            // fs.appendFile("log.txt", results.join(""), function(err, results){
            //     if (err) throw err;
            // })
        });
};


